import { Fragment, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DataTable } from './components/data-table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  formFieldName,
  ICategory,
  ITags,
  IQuoteFormList,
  IQuoteList,
} from './user';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ButtonYellowBg } from '@/components/ButtonYellowBg';
import { useAlertStore } from '@/stores/useAlertStore';

const User = () => {
  const { openAlert } = useAlertStore();
  const quoteColumns = [
    { header: 'Quote', accessorKey: 'sentence' },
    { header: "Book's name", accessorKey: 'book_name_zh' },
    { header: 'Categories', accessorKey: 'categories' },
    { header: 'Tags', accessorKey: 'tag_name' },
    { header: 'Page', accessorKey: 'page' },
  ];

  const [quoteList, setQuoteList] = useState<IQuoteList[]>([]);

  // get quotations
  const getQuoteList = async () => {
    await getDocs(collection(db, 'quotations')).then((res) => {
      const arr: IQuoteList[] = [];
      res.docs.forEach((item) => {
        const obj = { ...item.data(), id: item.id };
        arr.push(obj);
      });
      setQuoteList(arr);
    });
  };

  useEffect(() => {
    getQuoteList();
  }, []);

  const quoteFormList: IQuoteFormList[] = [
    {
      name: 'sentence',
      label: '金句',
      placeholder: '請輸入',
    },
    {
      name: 'book_name_zh',
      label: '書名',
      placeholder: '請輸入',
    },
    {
      name: 'book_author_zh',
      label: '作者名',
      placeholder: '請輸入',
    },
    {
      name: 'page',
      label: '頁數',
      placeholder: '請輸入',
      description: '非必填',
    },
    {
      name: 'category',
      label: '類別',
      placeholder: '選擇類別',
      isSelect: true,
    },
    {
      name: 'tag',
      label: '標籤',
      placeholder: '選擇標籤',
      description: '非必填',
      isSelect: true,
    },
  ];

  // 選中的
  const [selectedCategory, setSelectedCategory] = useState('allCategory');
  const [selectedTag, setSelectedTag] = useState('allTag');
  // for filter
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tags, setTags] = useState<ITags[]>([]);

  useEffect(() => {
    if (selectedCategory === 'allCategory' && selectedTag === 'allTag') {
      getQuoteList();
      return;
    }

    const chosenCategory = categories.find(
      (item) => item.id === selectedCategory,
    );
    const chosenTag = tags.find((item) => item.id === selectedTag);

    const filterQuoteList = quoteList.filter((item) => {
      if (selectedCategory !== 'all' && selectedTag !== 'all') {
        const isCategory = item.categories.includes(chosenCategory!.name);
        const isTag = item.tags.includes(chosenTag!.name);
        if (isCategory && isTag) return item;
      }
      if (selectedCategory !== 'all') {
        const isCategory = item.categories.includes(chosenCategory!.name);
        if (isCategory) return item;
      }

      if (selectedTag !== 'all') {
        const isTag = item.tags.includes(chosenTag!.name);
        if (isTag) return item;
      }

      // return true;
    });

    console.log(filterQuoteList);

    setQuoteList(filterQuoteList);
  }, [selectedCategory, selectedTag]);

  //#region form - category & tag

  // form
  const [formCategories, setFormCategories] = useState<string[]>([]);
  const [formTags, setFormTags] = useState<string[]>([]);

  // get categories
  useEffect(() => {
    getDocs(collection(db, 'categories')).then((res) => {
      const arr: ICategory[] = [{ id: 'allCategory', name: 'all' }];
      res.docs.forEach((item) => {
        const obj = { ...item.data(), name: item.data().name, id: item.id };
        arr.push(obj);
      });
      setCategories(arr);
    });
    // TODO Q 依賴項放categories會一直call API
  }, []);

  // get tags
  useEffect(() => {
    getDocs(collection(db, 'tags')).then((res) => {
      const arr: ITags[] = [{ id: 'allTag', name: 'all' }];
      res.docs.forEach((item) => {
        const obj = { ...item.data(), name: item.data().name, id: item.id };
        arr.push(obj);
      });
      setTags(arr);
    });
  }, []);

  const selectFormCategory = (value: string) => {
    if (formCategories.includes(value)) return;
    const arr = [...formCategories, value];

    setFormCategories(arr);
  };

  const removeFormCategory = (value: string) => {
    const arr = [...formCategories].filter((item) => item !== value);
    setFormCategories(arr);
  };

  const selectFormTag = (value: string) => {
    if (formTags.includes(value)) return;
    const arr = [...formTags, value];

    setFormTags(arr);
  };

  const removeFormTag = (value: string) => {
    const arr = [...formTags].filter((item) => item !== value);
    setFormTags(arr);
  };

  //#endregion

  //#region form
  // form visible control
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const closeDialog = () => setIsOpenDialog(false);

  // form validate
  const formSchema = z.object({
    sentence: z.string().min(4, {
      message: 'Sentence must be at least 4 characters.',
    }),
    book_name_zh: z.string().min(1, {
      message: "Book's name must be at least 1 characters.",
    }),
    book_author_zh: z.string().min(1, {
      message: 'Author must be at least 1 characters.',
    }),
    page: z.string(),
  });

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: '',
      book_name_zh: '',
      book_author_zh: '',
      page: '',
    },
  });

  const { reset } = form;

  // 另外處理類別驗證
  const [validateFormCategory, setValidateFormCategory] = useState(true);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setValidateFormCategory(formCategories.length > 0);
    if (!formCategories.length) return;

    // 已有相同句子
    const quotationsRef = collection(db, 'quotations');
    const querySentence = query(
      quotationsRef,
      where('sentence', '==', values.sentence),
    );

    const querySentenceSnapshot = await getDocs(querySentence);
    if (querySentenceSnapshot.docs.length) {
      openAlert('錯誤', '已有相同金句');
      return;
    }

    // 查詢相同書
    const booksRef = collection(db, 'books');
    const q = query(booksRef, where('name_zh', '==', values.book_name_zh));

    const querySnapshot = await getDocs(q);
    const bookInfo = querySnapshot.docs[0];

    // 沒對應書
    if (querySnapshot.docs.length === 0) {
      // *先新增書，取得參考
      // addDoc 自動生成 ID
      // setDoc 需指定 ID
      const bookDocRef = await addDoc(collection(db, 'books'), {
        name_zh: values.book_name_zh,
        author_zh: values.book_author_zh,
        // catrgory 先不綁
      });

      // 再新增 quote
      await addDoc(collection(db, 'quotations'), {
        ...values,
        book: bookDocRef,
        tags: formTags,
        categories: formCategories,
      });
    } else {
      addDoc(collection(db, 'quotations'), {
        ...values,
        book: bookInfo.ref,
        book_name_zh: bookInfo.data().name_zh,
        book_author_zh: bookInfo.data().author_zh,
        tags: formTags,
        categories: formCategories,
      });
    }

    // * 新增 quotations 的 tags & categories 存名稱就好
    // * tags & categories db不用存參考，都存名稱，要透過tags取得時用名稱比對

    // 清空、關閉表單
    reset();
    setFormCategories([]);
    setFormTags([]);
    closeDialog();
    getQuoteList();
    openAlert('成功', '新增成功');
  };
  //#endregion

  return (
    <div className="p-20">
      {/* TODO component */}
      {/* categories & TODO filter */}
      <RadioGroup
        defaultValue="allCategory"
        className="flex flex-wrap items-center gap-4"
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

      {/* tags & TODO filter */}
      <RadioGroup
        defaultValue="allTag"
        className="mt-4 flex flex-wrap items-center gap-4"
        onValueChange={setSelectedTag}
      >
        {tags.map((item) => {
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

      {/* TODO component */}
      {/* List */}
      <div className="mt-10">
        <div className="mb-4 flex justify-end">
          <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <AlertDialogTrigger asChild>
              <ButtonYellowBg context="新增" />
            </AlertDialogTrigger>
            <AlertDialogContent
              className="max-h-[80vh] overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>新增金句</AlertDialogTitle>
                <AlertDialogDescription />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {quoteFormList.map((item) => {
                      if (!item.isSelect)
                        return (
                          <FormField
                            key={item.name}
                            control={form.control}
                            name={item.name as formFieldName}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{item.label}</FormLabel>
                                <span className="pl-4 text-xs text-custom-subText">
                                  {item.description}
                                </span>
                                <FormControl>
                                  <Input
                                    placeholder={item.placeholder}
                                    {...field}
                                    type="select"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        );
                      return (
                        // 不用FormField好避開select驗證
                        <div key={item.name}>
                          <FormItem key={item.name}>
                            <FormLabel
                              className={
                                item.name === 'category' &&
                                !validateFormCategory
                                  ? 'text-destructive'
                                  : ''
                              }
                            >
                              {item.label}
                              <span className="pl-4 text-xs text-custom-subText">
                                {item.description}
                              </span>
                            </FormLabel>
                            <div className="mt-2 flex items-start gap-4">
                              <Select
                                key={item.name}
                                onValueChange={
                                  item.name === 'category'
                                    ? selectFormCategory
                                    : selectFormTag
                                }
                              >
                                <SelectTrigger className="max-w-[140px]">
                                  <SelectValue placeholder={item.name} />
                                </SelectTrigger>
                                <SelectContent>
                                  {(item.name === 'category'
                                    ? categories
                                    : tags
                                  )
                                    .filter(
                                      (i) =>
                                        i.id !== 'allCategory' &&
                                        i.id !== 'allTag',
                                    )
                                    .map((item) => (
                                      <Fragment key={item.id}>
                                        <SelectItem value={item.name}>
                                          {item.name}
                                        </SelectItem>
                                      </Fragment>
                                    ))}
                                </SelectContent>
                              </Select>
                              {/* selected items */}
                              <div className="w-[300px]">
                                {(item.name === 'category'
                                  ? formCategories
                                  : formTags
                                ).map((i) => (
                                  <Button
                                    key={i}
                                    type="button"
                                    variant="none"
                                    onDoubleClick={() =>
                                      (item.name === 'category'
                                        ? removeFormCategory
                                        : removeFormTag)(i)
                                    }
                                  >
                                    {i}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            {item.name === 'category' &&
                            !validateFormCategory ? (
                              <p className="text-[0.8rem] font-medium text-destructive">
                                Category must be at least 1 characters.
                              </p>
                            ) : (
                              ''
                            )}
                          </FormItem>
                        </div>
                      );
                    })}
                    <div>
                      <div className="-mt-4 text-xs text-custom-subText">
                        類別與 tag 點擊兩下即刪除
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <AlertDialogCancel className="w-[100%]">
                        Cancel
                      </AlertDialogCancel>
                      <ButtonYellowBg
                        context="Submit"
                        type="submit"
                        className="w-[100%]"
                      />
                    </div>
                  </form>
                </Form>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
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
