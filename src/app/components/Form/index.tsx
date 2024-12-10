'use client';

import {
  ChangeEvent,
  FC,
  FormEvent,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';
import cx from 'classnames';

import classNames from 'classnames';
import { LoadingIndicator } from '../LoadingIndicator';
import { Button } from '../Button';

interface FormI extends PropsWithChildren {
  message: string;
  error: boolean;
  onSubmit: () => void;
  success?: boolean;
}

interface FormComponent {
  TextInput: typeof TextInput;
  TextArea: typeof TextArea;
  Checkbox: typeof Checkbox;
  Submit: typeof Submit;
}

const formInputStyles =
  'w-full p-4 block bg-white border border-solid border-gray-medium disabled:text-gray-dark disabled:bg-gray-light print:w-auto';

const formLabelStyles = 'block font-bold leading-6 mb-3 print:size-xs';

export const Form: FC<FormI> & FormComponent = ({
  error,
  success,
  onSubmit,
  message,
  children,
}) => {
  const classNames = cx('group', error && 'error', success && 'success');

  return (
    <form
      data-component="form"
      className={classNames}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
      <div
        className={cx(
          'opacity-0 font-bold text-right',
          success && 'opacity-100 text-green',
          error && 'opacity-100 text-red',
          'print:hidden',
        )}
      >
        {message}
      </div>
    </form>
  );
};

interface TextInputI extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  modifier?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  id,
  label,
  defaultValue,
  type,
  required,
  placeholder,
  disabled,
  onChange,
}: TextInputI) => {
  return (
    <div className="relative mb-8">
      <label htmlFor={id} className={cx(formLabelStyles)}>
        {label}
      </label>
      <input
        className={formInputStyles}
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        onChange={onChange && onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

interface TextAreaI extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hiddenLabel?: boolean;
  modifier?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  id,
  label,
  hiddenLabel = false,
  required,
  maxLength,
  placeholder,
  defaultValue,
  onChange,
}: TextAreaI) => {
  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className={classNames(formLabelStyles, hiddenLabel && 'ally-hidden')}
      >
        {label}
      </label>
      <textarea
        className={cx(
          formInputStyles,
          'min-h-48 max-w-screen-md mx-auto',
          id === 'strategy' && 'print:hidden',
        )}
        name={id}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        maxLength={maxLength ? maxLength : 300}
        placeholder={placeholder}
      />
    </div>
  );
};

interface CheckboxI extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  label,
  required,
  placeholder,
  disabled,
  defaultChecked,
  value,
  onChange,
}: CheckboxI) => {
  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className={cx(
          formLabelStyles,
          'pl-10 font-normal text-base md:text-lg print:text-xs',
        )}
      >
        {label}
      </label>
      <input
        className={cx(
          formInputStyles,
          'absolute left-[-9999px] invisible',
          'print:left-0 print:top-0 print:visible',
          'peer',
        )}
        type="checkbox"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <span
        className={cx(
          'inline-block absolute left-0 top-0 w-6 h-6',
          'border border-solid border-gray-medium bg-white',
          'pointer-events-none',
          'print:hidden',
        )}
      ></span>
      <span
        className={cx(
          'absolute top-[7px] left-[5px] w-[14px] h-[10px]',
          'bg-[url("/icons/check.svg")] bg-no-repeat bg-center bg-cover',
          'scale-0 transition-transform duration-200 ease-in-expo',
          'pointer-events-none',
          'peer-checked:scale-100',
          'print:hidden',
        )}
      ></span>
    </div>
  );
};

interface SubmitI {
  label: string;
  loading?: boolean;
  variant?: 'slim';
}

const Submit = ({ label, variant, loading }: SubmitI) => {
  return (
    <div
      className={cx(
        'flex flex-row-reverse print:hidden',
        variant === 'slim' && '-mt-6',
      )}
    >
      <Button
        type="submit"
        label={label}
        className={cx(
          'ml-6 mb-4 z-0',
          variant === 'slim' &&
            'p-0 bg-white/0 underline text-black font-body font-normal normal-case hover:bg-white/0',
        )}
      />
      {loading && <LoadingIndicator additionalClasses="m-0" centered={false} />}
    </div>
  );
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.Checkbox = Checkbox;
Form.Submit = Submit;
