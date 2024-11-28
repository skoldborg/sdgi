'use client';

import {
  ChangeEvent,
  FC,
  FormEvent,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';
import cx from 'classnames';

import './form.scss';
import classNames from 'classnames';
import { LoadingIndicator } from '../LoadingIndicator';

interface FormI extends PropsWithChildren {
  message: string;
  error: boolean;
  onSubmit: () => void;
  success?: boolean;
  modifier?: 'centered';
}

interface FormComponent {
  TextInput: typeof TextInput;
  TextArea: typeof TextArea;
  Checkbox: typeof Checkbox;
  Status: typeof Status;
  Submit: typeof Submit;
}

export const Form: FC<FormI> & FormComponent = ({
  error,
  success,
  onSubmit,
  message,
  children,
  modifier,
}) => {
  const classNames = cx(
    'form',
    modifier && 'form--' + modifier,
    error && 'form--error',
    success && 'form--success',
  );

  return (
    <form
      className={classNames}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
      <div className={`form__status`}>{message}</div>
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
  modifier,
}: TextInputI) => {
  return (
    <div className="form__field">
      <label htmlFor={id} className={`form__label form__label--textarea`}>
        {label}
      </label>
      <input
        className={cx('form__input', modifier && `form__input--${modifier}`)}
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
  modifier,
}: TextAreaI) => {
  return (
    <div className="form__field">
      <label
        htmlFor={id}
        className={classNames(
          `form__label form__label--textarea`,
          hiddenLabel && 'form__label--hidden',
        )}
      >
        {label}
      </label>
      <textarea
        className={cx('form__input', modifier && `form__input--${modifier}`)}
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
  modifier?: string;
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
    <div className="form__field">
      <label htmlFor={id} className={`form__label form__label--checkbox`}>
        {label}
      </label>
      <input
        className={`form__input form__input--checkbox`}
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
      <span className="form__input-checkbox"></span>
    </div>
  );
};

interface SubmitI {
  label: string;
  modifier?: string;
  loading?: boolean;
}

const Submit = ({ label, modifier, loading }: SubmitI) => {
  return (
    <div
      className={cx('form__footer', modifier && `form__footer--${modifier}`)}
    >
      <button
        type="submit"
        className={cx('form__submit button', modifier && `button--${modifier}`)}
      >
        <span className="button__inner">{label}</span>
      </button>
      {loading && <LoadingIndicator />}
    </div>
  );
};

const Status = ({ message }: { message: string }) => (
  <div className={`form__status`}>{message}</div>
);

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.Checkbox = Checkbox;
Form.Status = Status;
Form.Submit = Submit;
