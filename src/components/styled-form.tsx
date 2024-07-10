import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
  name: z
    .string({
      required_error: "Please select Your Name.",
      invalid_type_error: "Brand should be Text",
    })
    .min(2, {
      message: "Name should be at least 3 characters",
    }),
  email: z
    .string({
      required_error: "This Field is Required",
      invalid_type_error: "Email should be Text",
    })
    .email({
      message: "Please Enter a Valid Email",
    }),
  article: z.string({
    required_error: "This Field is Required",
    invalid_type_error: "Article should be Text",
  }),
  supplier: z.string({
    required_error: "This Field is Required",
    invalid_type_error: "Supplier should be Text",
  }),
  brand: z.string({
    required_error: "This Field is Required",
    invalid_type_error: "Brand should be Text",
  }),
  price: z.string({
    required_error: "This Field is Required",
    invalid_type_error: "Brand should be Text",
  }),
  image: z
    .any()
    .refine(
      (file): file is File => file instanceof File,
      "Selected file is not an image"
    )
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      "Image size should be less than " + MAX_UPLOAD_SIZE
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only JPEG and PNG images are allowed"
    ),
});

const names: string[] = [
  "ANAS",
  "GADAA",
  "NACHIT",
  "FARISS",
  "ABDEL",
  "AHMED",
  "HAMID",
  "OMAR",
  "HOCIN",
  "RAOUI",
  "MABSOUTE",
  "MASMOUDI",
  "NAJWA",
  "IMAD",
  "KHALID",
];

const StyledForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <ScrollArea className="bg-white w-full h-full sm:max-w-xl sm:h-fit px-4 py-6 sm:rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your name." />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {names.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="xyz@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <FormControl>
                  <Input placeholder="Peugeot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Valeo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
};
export default StyledForm;
