import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z, } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { updateContactAtom } from "@/state/contact";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
export default function ViewEditContactModal({ isOpen, onOpenChange, contact }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void, contact: { first_name: string, last_name?: string, mobile?: string, address?: string, id: number } }) {
    const { toast } = useToast()
    const [, updateContact] = useAtom(updateContactAtom)
    const formSchema = z.object({
        first_name: z.string()
            .min(3, {
                message: "Name must be at least 2 characters.",
            }),
        last_name: z.string()
            .optional(),
        address: z.string()
            .optional(),
        mobile: z.string()
            .optional(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: contact,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateContact({ id: contact.id, ...values }).then((resp) => {
            toast({
                title: 'Success',
                description: resp.message,
            })
            return true
        }).catch(e => {
            toast({
                title: 'Failure',
                description: e.message,
                variant: 'destructive'
            })
            return false
        }).then((success) => {
            if (success) {
                form.reset()
                onOpenChange(false)
            }
        })
    }
    return <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        motionProps={{
            initial: { y: 300, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 300, opacity: 0 },
            transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Edit contact</ModalHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ModalBody>
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Mobile</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mobile" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="secondary" onClick={(e) => {
                                    form.reset()
                                    onClose()
                                    e.preventDefault()
                                }}>
                                    Cancel
                                </Button>
                                <Button color="primary">
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </Form>
                </>
            )}
        </ModalContent>
    </Modal>;
}