import React, { useState, KeyboardEvent, ChangeEvent, Dispatch, useEffect } from 'react';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import { colors, fonts } from 'theme/main';
import Keyword from 'components/KeywordsManager/Keyword';
import Button from 'components/Button/Button';
import KeywordsContainer from './KeywordsContainer';

const Wrapper = styled.div<{ customStyle: string | undefined }>`
  :not(:first-of-type) {
    margin-top: 0.9rem;
  }
  ${({ customStyle }) => customStyle};
`;

const ManagerName = styled.p`
  font: inherit;
  font-size: ${fonts.big};
  color: ${colors.lightGrey};
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Creator = styled.div`
  display: inline-flex;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 90%;
  margin-right: 1rem;
  margin-bottom: 0;
`;

const Description = styled.span`
  color: ${colors.darkGrey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${fonts.medium};
`;

interface Keywords {
  positive: string[];
  negative: string[];
  multi?: string[];
  keywordsAmount: number;
}

interface Props {
  name: string;
  error: boolean;
  onChange: (name: string, { positive, negative, multi }: Keywords) => void;
  setTouched: (name: string, value: boolean) => void;
  placeholder: string;
  values: Keywords;
  description?: string;
  hasMulti?: boolean;
  customStyle?: string;
}

const KeywordsManager = ({
  name,
  hasMulti,
  placeholder,
  onChange,
  error,
  setTouched,
  description,
  customStyle,
  values,
}: Props) => {
  const [positive, setPositive] = useState<string[]>(values.positive);
  const [negative, setNegative] = useState<string[]>(values.negative);
  const [multi, setMulti] = useState<string[]>(values.multi || []);
  const [fieldError, setFieldError] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const keywordsAmount = positive.length + negative.length + multi.length;
    const keywords = hasMulti
      ? { positive, negative, multi, keywordsAmount }
      : { positive, negative, keywordsAmount };
    onChange(name, keywords);
  }, [onChange, positive, negative, multi, name, hasMulti]);

  useEffect(() => {
    setPositive(values.positive);
    setNegative(values.negative);
    if (values.multi) setMulti(values.multi);
  }, [values]);

  //TODO: temp fix
  const handleChange = (event: { target: any }) => {
    setValue(event.target.value);
    if (fieldError) setFieldError('');
  };

  const addKeywordToList = (
    add: Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    regex: RegExp,
  ): boolean => {
    setTouched(name, true);
    const matches = regex.exec(value);
    if (!matches || !matches[1]) {
      return false;
    }
    const keyword = matches[1].trim().toLowerCase();
    if (!list.includes(keyword)) {
      add([...list, keyword]);
      setValue('');

      return true;
    } else {
      setFieldError('Duplicate');

      return true;
    }
  };

  const handleNewKeyword = () => {
    const positiveKeywordRegex = /^\+(.+)/;
    const negativeKeywordRegex = /^-(.+)/;
    const multiKeywordRegex = /(.+ \| .+)/;

    if (addKeywordToList(setPositive, positive, positiveKeywordRegex)) return;
    if (addKeywordToList(setNegative, negative, negativeKeywordRegex)) return;
    if (hasMulti && addKeywordToList(setMulti, multi, multiKeywordRegex)) return;
    setFieldError('Incorrect format');
  };

  const removeKeyword = (
    keywordToRemove: string,
    list: string[],
    setList: Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList(list.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNewKeyword();
    }
  };

  return (
    <Wrapper customStyle={customStyle}>
      <KeywordsContainer error={error}>
        <ManagerName>{name}</ManagerName>
        {positive.length === 0 && negative.length === 0 && multi.length === 0 && (
          <Description>{description}</Description>
        )}
        <List>
          {positive.map(keyword => (
            <Keyword key={keyword} onClick={() => removeKeyword(keyword, positive, setPositive)}>
              {keyword}
            </Keyword>
          ))}
        </List>
        <List>
          {multi.map(keyword => (
            <Keyword key={keyword} multi onClick={() => removeKeyword(keyword, multi, setMulti)}>
              {keyword}
            </Keyword>
          ))}
        </List>
        <List>
          {negative.map(keyword => (
            <Keyword
              key={keyword}
              negative
              onClick={() => removeKeyword(keyword, negative, setNegative)}
            >
              {keyword}
            </Keyword>
          ))}
        </List>
      </KeywordsContainer>
      <Creator onKeyPress={handleKeyPress}>
        <StyledInput
          custom
          name="keyword"
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          customError={fieldError}
        />
        <Button
          secondary
          small
          height="3.7rem"
          bgColor={colors.secondaryBackground}
          onClick={handleNewKeyword}
        >
          Add
        </Button>
      </Creator>
    </Wrapper>
  );
};

export default KeywordsManager;
