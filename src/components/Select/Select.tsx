import React from 'react';
import ReactSelect from 'react-select';
import styled, { css } from 'styled-components';
import { fonts, colors } from 'theme/main';

interface Option {
  value: string;
  label: string;
}
interface Props {
  name: string;
  placeholder: string;
  options: Option[];
  value: Option | null;
  onChange: (name: string, value: Option) => void;
  onBlur: (name: string, value: boolean) => void;
  error: boolean;
  width?: string;
  specialPlaceholder?: boolean;
}

const StyledSelect = styled(ReactSelect)<Props & { isTouched: boolean }>`
  &.rs-container {
    height: 3.7rem;
    width: ${({ width }) => width || '100%'};
    min-height: 3.7rem;
    font: inherit;
    font-size: ${fonts.regular};
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    :focus-within {
      z-index: 100;
    }

    .rs__placeholder {
      color: ${colors.darkGrey};
      ${({ specialPlaceholder }) =>
        specialPlaceholder &&
        css`
          color: transparent;
          background: ${colors.mainGradient45};
          -webkit-background-clip: text;
        `}
    }

    .rs__input {
      color: ${colors.lightGrey};
    }

    .rs__control {
      background-color: ${colors.tertiaryBackground};
      box-shadow: none;
      min-height: 3.7rem;
      .rs__indicator svg {
        height: 1.5rem;
        width: 3rem;
        color: ${({ error }) => (error ? '#890000' : colors.darkGrey)};
        color: ${({ specialPlaceholder, isTouched }) =>
          specialPlaceholder && !isTouched && colors.pink};
      }
      cursor: pointer;
      border: double 1px transparent;

      ${({ error }) =>
        error &&
        css`
          background-image: linear-gradient(
              ${colors.tertiaryBackground},
              ${colors.tertiaryBackground}
            ),
            ${colors.redDanger};
          background-origin: border-box;
          background-clip: padding-box, border-box;
        `}
    }

    .rs__control--menu-is-open {
      background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
        ${colors.mainGradientLR};
      background-origin: border-box;
      background-clip: padding-box, border-box;
      .rs__indicator svg {
        color: ${colors.violet};
      }
    }

    .rs__menu {
      background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
        ${colors.mainGradientLR};
      background-origin: border-box;
      background-clip: padding-box, border-box;
      border: double 1px transparent;
      border-radius: 0.5rem;
      margin-top: 0.5rem;
      padding: 0.2rem 0;
    }

    .rs__menu-list {
      margin-right: 0.3rem;
      position: relative;
    }

    .rs__menu-list::-webkit-scrollbar {
      background-color: transparent;
      width: 0.3rem;
      border-radius: 2rem;
      overflow: hidden;
    }

    .rs__menu-list::-webkit-scrollbar-thumb {
      background-color: ${colors.violet};
      border-radius: 2rem;
    }

    .rs__option {
      background-color: ${colors.tertiaryBackground};

      color: ${colors.darkGrey};
      :hover {
        color: ${colors.lightGrey};
      }
      transition: all 0.3s;

      padding: 0.5rem 1.5rem 0.8rem;
      cursor: pointer;
    }
    .rs__option--is-selected {
      color: transparent;
      background: ${colors.mainGradient45};
      /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
      -webkit-background-clip: text;
      background-clip: text;
    }

    .rs__value-container {
      padding-left: 1.4rem;
      margin-top: -0.05rem;
    }
    .rs__single-value {
      color: ${colors.lightGrey};
    }

    .rs__indicator-separator {
      display: none;
    }
  }
`;

const Select = ({
  options,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  width,
  specialPlaceholder,
}: Props) => {
  const handleChange = (value: Option) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <StyledSelect
      specialPlaceholder={specialPlaceholder}
      options={options}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      classNamePrefix="rs"
      className="rs-container"
      error={error}
      width={width}
      maxMenuHeight="15rem"
      isTouched={value}
    />
  );
};

export default Select;
