import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  placeholder?: string;
  title?: string;
  items: {
    value: string;
    label: string;
  }[];
  withIcon?: boolean;
  textColor?: string;
};

const SelectField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  title,
  placeholder,
  items,
  withIcon,
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <SelectRoot onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                withIcon={withIcon}
                className={`${
                  withIcon ? 'w-44 justify-between' : `w-28 justify-center`
                }`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {title && <SelectLabel>{title}</SelectLabel>}
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectRoot>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
