import React, { forwardRef } from 'react';
import {
  Input,
  useInputProps,
  InputSharedProps,
  InputWrapperBaseProps,
  DefaultProps,
  Selectors,
  Popover,
  Modal,
  InputStylesNames,
  InputWrapperStylesNames,
  PopoverProps,
  ModalProps,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDatesInput } from '../__utils__/use-dates-input';
import { pickCalendarLevelsProps, CalendarLevelsStylesNames } from '../CalendarLevels';
import { YearPicker, YearPickerBaseProps } from '../YearPicker';
import { DatePickerType } from '../types';
import useStyles from './YearPickerInput.styles';

export type YearPickerInputStylesNames =
  | CalendarLevelsStylesNames
  | InputStylesNames
  | InputWrapperStylesNames
  | Selectors<typeof useStyles>;

export interface YearPickerInputProps<Type extends DatePickerType = 'default'>
  extends DefaultProps<YearPickerInputStylesNames>,
    InputSharedProps,
    InputWrapperBaseProps,
    YearPickerBaseProps<Type>,
    Omit<React.ComponentPropsWithRef<'button'>, 'defaultValue' | 'value' | 'onChange' | 'type'> {
  /** Determines whether dropdown should be closed when date is selected, not applicable when type="multiple", true by default */
  closeOnChange?: boolean;

  /** Type of dropdown, defaults to popover */
  dropdownType?: 'popover' | 'modal';

  /** Props added to Popover component */
  popoverProps?: Partial<Omit<PopoverProps, 'children'>>;

  /** Props added to Modal component */
  modalProps?: Partial<Omit<ModalProps, 'children'>>;
}

type YearPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: YearPickerInputProps = {
  type: 'default',
  yearsListFormat: 'YYYY',
  closeOnChange: true,
};

export const YearPickerInput: YearPickerInputComponent = forwardRef((props, ref) => {
  const {
    inputProps,
    wrapperProps,
    type,
    value,
    defaultValue,
    onChange,
    yearsListFormat,
    locale,
    placeholder,
    classNames,
    styles,
    unstyled,
    popoverProps,
    modalProps,
    closeOnChange,
    dropdownType,
    ...rest
  } = useInputProps('YearPickerInput', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: 'YearPickerInput',
  });
  const { calendarLevelsProps, others } = pickCalendarLevelsProps(rest);
  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);

  const { _value, setValue, formattedValue } = useDatesInput({
    type,
    value,
    defaultValue,
    onChange,
    locale,
    format: yearsListFormat,
  });

  const handleChange = (val: any) => {
    if (type === 'default') {
      dropdownHandlers.close();
    }

    if (type === 'range' && val[0] && val[1]) {
      dropdownHandlers.close();
    }

    setValue(val);
  };

  return (
    <>
      {dropdownType === 'modal' && (
        <Modal
          opened={dropdownOpened}
          onClose={dropdownHandlers.close}
          withCloseButton={false}
          size="auto"
          {...modalProps}
        >
          <YearPicker
            {...calendarLevelsProps}
            type={type}
            value={_value}
            onChange={handleChange}
            yearsListFormat={yearsListFormat}
            locale={locale}
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
            __staticSelector="YearPickerInput"
          />
        </Modal>
      )}

      <Input.Wrapper __staticSelector="YearPickerInput" {...wrapperProps}>
        <Popover
          position="bottom-start"
          opened={dropdownOpened}
          onClose={dropdownHandlers.close}
          disabled={dropdownType === 'modal'}
          {...popoverProps}
        >
          <Popover.Target>
            <Input
              component="button"
              __staticSelector="YearPickerInput"
              onClick={dropdownHandlers.toggle}
              {...inputProps}
              classNames={{ ...classNames, input: cx(classes.input, (classNames as any)?.input) }}
              {...others}
              ref={ref}
            >
              {formattedValue || <div className={classes.placeholder}>{placeholder}</div>}
            </Input>
          </Popover.Target>

          <Popover.Dropdown>
            <YearPicker
              {...calendarLevelsProps}
              type={type}
              value={_value}
              onChange={handleChange}
              yearsListFormat={yearsListFormat}
              locale={locale}
              classNames={classNames}
              styles={styles}
              unstyled={unstyled}
              __staticSelector="YearPickerInput"
            />
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
    </>
  );
});

YearPickerInput.displayName = '@mantine/dates/YearPickerInput';
