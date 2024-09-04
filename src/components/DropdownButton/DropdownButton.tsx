import React, { useState, useRef, useEffect } from 'react';
import dropdown_arrow from '../../assets/images/dropdown_arrow.svg';
import styles from './DropdownButton.module.css';

interface DropdownItem {
  id: string;
  label: string;
  value: string | number;
}

interface DropdownButtonProps {
  id: string;
  title?: string;
  options: DropdownItem[];
  selectedOption?: DropdownItem;
  onSelect?: (option: DropdownItem) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  id,
  title = 'Select',
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (option: DropdownItem) => {
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer}>
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        <span>{selectedOption ? selectedOption.label : title}</span>
        <span
          className={styles.arrow}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <img src={dropdown_arrow} alt="Arrow" className={styles.arrowImage} />
        </span>
      </button>
      <div className={`${styles.options} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleChange(option)}
              className={`${styles.option} ${
                selectedOption?.id === option.id ? styles.selected : ''
              }`}
            >
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownButton;
