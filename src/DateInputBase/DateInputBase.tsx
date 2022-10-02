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
import { CalendarLevelsStylesNames } from '../CalendarLevels';
import useStyles from './DateInputBase.styles';

export type DateInputBaseStylesNames =
  | CalendarLevelsStylesNames
  | InputStylesNames
  | InputWrapperStylesNames
  | Selectors<typeof useStyles>;

export interface DateInputSharedProps
  extends DefaultProps<DateInputBaseStylesNames>,
    InputSharedProps,
    InputWrapperBaseProps,
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

export interface DateInputBaseProps extends DateInputSharedProps {
  __staticSelector: string;
  children: React.ReactNode;
  formattedValue: string;
  dropdownHandlers: ReturnType<typeof useDisclosure>[1];
  dropdownOpened: boolean;
}

const defaultProps: Partial<DateInputBaseProps> = {
  closeOnChange: true,
};

export const DateInputBase = forwardRef<HTMLButtonElement, DateInputBaseProps>((props, ref) => {
  const {
    inputProps,
    wrapperProps,
    placeholder,
    classNames,
    styles,
    unstyled,
    popoverProps,
    modalProps,
    closeOnChange,
    dropdownType,
    children,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    ...others
  } = useInputProps(props.__staticSelector, defaultProps, props);

  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    unstyled,
    name: inputProps.__staticSelector,
  });

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
          {children}
        </Modal>
      )}

      <Input.Wrapper __staticSelector={inputProps.__staticSelector} {...wrapperProps}>
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
              __staticSelector={inputProps.__staticSelector}
              onClick={dropdownHandlers.toggle}
              {...inputProps}
              classNames={{ ...classNames, input: cx(classes.input, (classNames as any)?.input) }}
              {...others}
              ref={ref}
            >
              {formattedValue || <div className={classes.placeholder}>{placeholder}</div>}
            </Input>
          </Popover.Target>

          <Popover.Dropdown>{children}</Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
    </>
  );
});

DateInputBase.displayName = '@mantine/dates/DateInputBase';
