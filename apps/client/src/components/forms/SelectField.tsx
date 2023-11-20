import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  placeholder?: string;
  title?: string;
  items: {
    value: string;
    label: string;
  }[];
  withIcon?: boolean;
};

const SelectField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
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
                className='w-[112px] justify-center'
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
