'use client';

import { useState, useEffect } from 'react';
import { UIComponent } from '@/domains/ui/types/component.types';
import { ComponentRenderer } from '@/domains/ui/components/ComponentRenderer';
import { StepResponse } from '../types/survey.types';
import { validateStepValue } from '../validation/stepValidation';
import styles from './InteractiveStep.module.scss';

type InteractiveStepProps = {
  stepId: string;
  component: UIComponent;
  onResponse: (response: StepResponse) => void;
  onValidationChange: (isValid: boolean) => void;
};

export const InteractiveStep = ({
  stepId,
  component,
  onResponse,
  onValidationChange,
}: InteractiveStepProps) => {
  const [value, setValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [rating, setRating] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>('');

  const validate = (currentValue: unknown) => {
    const result = validateStepValue(component.type, currentValue);
    setValidationError(result.error || '');
    onValidationChange(result.valid);
    return result.valid;
  };

  useEffect(() => {
    if (component.type === 'hero' || component.type === 'banner') {
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [component.type, onValidationChange]);

  const handleTextChange = (newValue: string) => {
    setValue(newValue);
    validate(newValue);
    onResponse({
      stepId,
      componentId: component.id,
      componentType: component.type,
      value: newValue,
    });
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    validate(newRating);
    onResponse({
      stepId,
      componentId: component.id,
      componentType: component.type,
      value: newRating,
    });
  };

  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    const newValue = Array.from(newSelected);
    validate(newValue);
    onResponse({
      stepId,
      componentId: component.id,
      componentType: component.type,
      value: newValue,
    });
  };

  const renderInteractive = () => {
    switch (component.type) {
      case 'hero':
        return <ComponentRenderer component={component} />;

      case 'card':
        const cardData = component.data;
        const isRating = cardData.description?.includes('rate');

        if (isRating) {
          return (
            <div>
              <ComponentRenderer component={component} />
              <div className={styles.ratingInput}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.star} ${rating >= star ? styles.starActive : ''}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div>
            <ComponentRenderer component={component} />
            <textarea
              className={styles.textarea}
              placeholder="Enter your feedback..."
              value={value}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={4}
            />
          </div>
        );

      case 'list':
        const listData = component.data;
        return (
          <div>
            <h3 className={styles.listTitle}>{listData.title}</h3>
            <div className={styles.checkboxList}>
              {listData.items.map((item) => (
                <label key={item.id} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span className={styles.checkboxIcon}>{item.icon}</span>
                  <span className={styles.checkboxText}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'banner':
        return <ComponentRenderer component={component} />;

      default:
        return <ComponentRenderer component={component} />;
    }
  };

  return (
    <div className={styles.interactive}>
      {renderInteractive()}
      {validationError && (
        <div className={styles.error}>{validationError}</div>
      )}
    </div>
  );
};
