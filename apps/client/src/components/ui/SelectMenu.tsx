import {
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

type Props = {
  items: {
    value: string;
    label: string;
  }[];
  title?: string;
  placeholder?: string;
  withIcon?: boolean;
};

function SelectMenu({ items, title, placeholder, withIcon }: Props) {
  return (
    <SelectRoot>
      <SelectTrigger withIcon={withIcon} className='w-[180px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
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
  );
}

export default SelectMenu;
