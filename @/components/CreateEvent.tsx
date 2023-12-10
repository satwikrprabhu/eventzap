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
  import { Textarea } from "@/components/ui/textarea"
  import z from "zod"
  import { Button } from "@/components/ui/button"
  import { zodResolver } from "@hookform/resolvers/zod"
  import {useForm} from "react-hook-form"
  import { Input } from "@/components/ui/input"
  import { api } from "~/utils/api"
  import { useToast } from "@/components/ui/use-toast"
  import { DateTimePicker } from "./DateTimePicker"
  import { useState } from "react"

  //Schema for form validation
    const formSchema = z.object({
      name: z.string().min(2, {
        message: "Event name must be atleast 2 characters.",
      }),
      poster: z.string( {
        errorMap: (issue, ctx) => ({ message: 'Poster must be uploaded' })
      })
      ,
      description: z.string().min(20, {
        message: "Description must have atleast 20 characters.",
      }),
      eventDate: z.date(),
      location:z.string(),
      fees:z.string().regex(
        /^[0-9]+$/,
        "Please enter the correct fee"
      ),
      category:z.enum(["Technical","Cultural","Workshop","Sports"], {
        errorMap: (issue, ctx) => ({ message: 'Event category must be selected' })
      }),
      eventType:z.enum(["Solo","Team"], {
        errorMap: (issue, ctx) => ({ message: 'Event type must be selected' })
      }),
      minTeamSize:z.string().regex(
        /^[0-9]+$/,
        "Please enter the correct fee"
      ),
      maxTeamSize:z.string().regex(
        /^[0-9]+$/,
        "Please enter the correct fee"
      ),
      mode:z.enum(["Offline","Online"], {
        errorMap: (issue, ctx) => ({ message: 'Event type must be selected' })
      })})


      
      export function CreateEvent() {
    const [selectedDate,setDate] = useState<Date>();
    const { toast } = useToast()
    const register = api.event.createEvent.useMutation(
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
          
        })
  
  
      //OnSubmit function
      async function onSubmit(values: z.infer<typeof formSchema>) {
        register.mutate({
          name:values.name,
          posterUrl:values.poster,
          description:values.description,
          fees:parseInt(values.fees),
          category:values.category,
          location:values.location,
          eventType:values.eventType,
          minTeamSize:parseInt(values.minTeamSize),
          maxTeamSize:parseInt(values.maxTeamSize),
          offorOn:values.mode,
          eventDate:values.eventDate,
        })
        console.log(values);
      }
      
      
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 font-semibold">Create Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Please enter your event details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Enter event description"
                  {...field}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
           <FormField
            control={form.control}
            name="poster"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Event Poster</FormLabel >
                <FormControl>
                <Input id="picture" type="file"  {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                <Input type="name" placeholder="Enter event venue"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field: { onChange, value, ref, name, ...otherFieldProps } }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                <DateTimePicker {...otherFieldProps} // spread remaining field props
                    value={value} 
                    onChange={(selectedDate:Date) => {
                      onChange(selectedDate);
                      setDate(selectedDate); 
                    }} 
                    ref={ref} 
                    name={name} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Category</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>


          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Team">Team</SelectItem>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            
            
          <FormField
            control={form.control}
            name="minTeamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Team Size</FormLabel>
                <FormControl>
                <Input type="text" placeholder="Enter Minimum Team Size"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxTeamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Team Size</FormLabel>
                <FormControl>
                <Input type="text" placeholder="Enter Maximum Team Size"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
            
           <FormField
            control={form.control}
            name="fees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fees</FormLabel>
                <FormControl>
                <Input type="text" placeholder="Enter event Fees"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
  
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Mode</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode of event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
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
  