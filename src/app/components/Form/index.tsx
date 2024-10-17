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
  modifier?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  id,
  label,
  required,
  maxLength,
  placeholder,
  defaultValue,
  onChange,
  modifier,
}: TextAreaI) => {
  return (
    <div className="form__field">
      <label htmlFor={id} className={`form__label form__label--textarea`}>
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
  modifier: string;
  onChange: () => void;
}

const Checkbox = ({
  id,
  label,
  required,
  placeholder,
  disabled,
  checked,
  value,
  onChange,
  modifier,
}: CheckboxI) => {
  return (
    <div className="form__field">
      <label htmlFor={id} className={`form__label form__label--checkbox`}>
        {label}
      </label>
      <input
        className={`form__input form__input--${modifier}`}
        type="checkbox"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        checked={checked}
        disabled={disabled}
      />
      <span className="form__input-checkbox"></span>
    </div>
  );
};

interface SubmitI {
  label: string;
  modifier?: string;
}

const Submit = ({ label, modifier }: SubmitI) => {
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
