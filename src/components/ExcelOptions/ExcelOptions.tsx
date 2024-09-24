import React, { useState, useRef, useEffect } from 'react';
import arrow from '../../assets/images/arrow.svg';

interface DropdownItem {
  id: string;
  label: string;
  value: string;
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

  const handleChange = (option: DropdownItem) => {
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '1rem', flexGrow: 1,}}>
      <button
        id={id}
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          minWidth: '150px',
          height: '100%',
          minHeight: '20px',
          fontSize: '1rem',
          padding: '0.5rem',
          backgroundColor: 'var(--backgroud_color)',
          color: 'var(--font_color)',
          border: '1px solid var(--border_color)',
          borderRadius: '4px',
          textAlign: 'center',
          flexGrow: 1,
          cursor: 'pointer',
        }}
      >
        <span>{selectedOption ? selectedOption.label : title}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
          <img src={arrow} alt="Arrow" style={{ width: '16px', height: '16px' }} />
        </span>

      </button>
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        backgroundColor: 'var(--backgroud_color3)',
        border: '1px solid var(--border_color)',
        color: 'var(--font_color)',
        borderRadius: '4px',
        overflow: 'hidden',
        zIndex: 10,
        width: '100%',
        maxHeight: isOpen ? '150px' : '0',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 1 ease, opacity 0.5s ease'
      }}>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleChange(option)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                backgroundColor: selectedOption?.id === option.id ? 'var(--historic_point_hover)' : 'transparent',
              }}
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
