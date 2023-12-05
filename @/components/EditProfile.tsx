import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "~/utils/api"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { useToast } from "@/components/ui/use-toast"

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    branch: z.enum(["CSE","ISE","ECE","AIDS","AIML","RAI","CYBER","FULLSTACK","CCE","EEE","CIVIL","MECH","MCA","CYBER","FULLSTACK"]),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    year: z.enum(["1","2","3","4"]),
  })

export function EditProfile() {
  const { toast } = useToast()
  const user = api.user.getProfile.useQuery()
  const register = api.user.editProfile.useMutation()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: user?.data?.name || '',
        phone: user?.data?.phone || '',
        // @ts-ignore
        branch: user?.data?.branch || null,
        // @ts-ignore
        year: user?.data?.year || null,
      },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      await register.mutate({
        name: values.name,
        phone: values.phone,
        branch: values.branch,
        year: parseInt(values.year),
      })
      register.isSuccess && toast({
        description: "Profile updated successfully",
      })


      console.log(values);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 font-semibold">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter branch</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="AIDS">AIDS</SelectItem>
                  <SelectItem value="AIML">AIML</SelectItem>
                  <SelectItem value="BT">BT</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="CYBER">CYBER</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="EEE">EEE</SelectItem>
                  <SelectItem value="FULLSTACK">FULLSTACK</SelectItem>
                  <SelectItem value="MECH">MECH</SelectItem>
                  <SelectItem value="ISE">ISE</SelectItem>
                  <SelectItem value="RAI">R&AI</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        <Button type="submit" className="text-right">Submit</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}
