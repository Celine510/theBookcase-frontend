import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';

import { DataTable } from './components/data-table';
import { Button } from '@/components/ui/button';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Link } from 'react-router-dom';
import { ICategory, IQuoteList } from './user';

const User = () => {
  const quoteColumns = [
    { header: 'Quote', accessorKey: 'sentence' },
    { header: "Book's name", accessorKey: 'book_name_zh' },
    { header: 'Categories', accessorKey: 'category_name' },
    { header: 'Tags', accessorKey: 'tag_name' },
    { header: 'Page', accessorKey: 'page' },
  ];

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [quoteList, setQuoteList] = useState<IQuoteList[]>([]);

  // get categories
  useEffect(() => {
    getDocs(collection(db, 'categories')).then((res) => {
      const arr: ICategory[] = [{ id: 'all', name: 'all' }];
      res.docs.forEach((item) => {
        const obj = { ...item.data(), id: item.id };
        arr.push(obj);
      });
      setCategories(arr);
    });
  }, [categories]);

  // get quotations
  useEffect(() => {
    getDocs(collection(db, 'quotations')).then((res) => {
      const arr: IQuoteList[] = [];
      res.docs.forEach((item) => {
        const obj = { ...item.data(), id: item.id };
        arr.push(obj);
      });
      setQuoteList(arr);
    });
  }, [quoteList]);

  return (
    <div className="p-20">
      {/* categories & TODO filter */}
      <RadioGroup
        defaultValue="all"
        className="flex gap-4"
        onValueChange={setSelectedCategory}
      >
        {categories.map((item) => {
          return (
            <div key={item.id}>
              <RadioGroupItem
                value={item.id}
                id={item.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={item.id}
                className="flex flex-col items-center justify-between rounded-md border-[1px] border-muted px-4 py-2 peer-data-[state=checked]:border-custom-yellow peer-data-[state=checked]:text-custom-yellow [&:has([data-state=checked])]:border-custom-yellow"
              >
                {item?.name}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {/* List */}
      <div className="mt-10">
        <div className="mb-4 flex justify-end">
          <Button className="inset-1 border-[1px] border-custom-yellow bg-custom-yellow px-6 text-custom-black hover:border-white hover:bg-transparent hover:text-white">
            新增
          </Button>
        </div>
        <DataTable data={quoteList} columns={quoteColumns} />
      </div>

      {/* links */}
      <div className="mt-10 flex justify-between">
        <Link to="/quote-ocean">
          <Button variant="link" className="py-4 pl-0 pr-20 text-white">
            {'< '}前往金句海
          </Button>
        </Link>
        <Link to="/quote-pool">
          <Button variant="link" className="py-4 pl-20 pr-0 text-white">
            前往個人金句池{' >'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default User;
