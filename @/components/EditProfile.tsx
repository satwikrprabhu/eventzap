import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import z from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { Input } from "@/components/ui/input"
import { api } from "~/utils/api"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"

//Schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    branch: z.enum(["CSE","ISE","ECE","AIDS","AIML","RAI","CYBER","FULLSTACK","CCE","EEE","CIVIL","MECH","MCA","CYBER","FULLSTACK"], {
      errorMap: (issue, ctx) => ({ message: 'Branch must be selected' })
    })
    ,
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    year: z.enum(["1","2","3","4"], {
      errorMap: (issue, ctx) => ({ message: 'Year must be selected' })
    })
  })

export function EditProfile() {
  const { toast } = useToast()
  const session = useSession().data
  const register = api.user.editProfile.useMutation(
    {
      //OnSuccess Toast
      onSuccess: () => {
        toast({
          title: "Updated Profile Successfully!",
          description: "Your profile has been updated successfully.",
          variant: "default",
        })
      },
      onError:(error)=>{
        toast({
          title:"Uh oh! Something went wrong!",
          description:"Please try again later.",
          variant:"destructive"
        })
      }
    }
  )
    //Default values for form
     const  form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: session?.user?.name || '' ,
          phone:session?.user?.phone || '',
          // @ts-ignore
          branch: session?.user?.branch?.toString() || '',
          // @ts-ignore
          year: session?.user?.year?.toString() || '',
        },
      })


    //OnSubmit function
    async function onSubmit(values: z.infer<typeof formSchema>) {
      register.mutate({
        name: values.name,
        phone: values.phone,
        branch: values.branch,
        year: parseInt(values.year),
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
