import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z, } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { createContactAtom } from "@/state/contact";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Textarea } from "../ui/textarea";
export const AllowedPriorities = [
    "Low",
    "Medium",
    "High",
    "Critical",
];
export default function CreateContactModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    const [, createContact] = useAtom(createContactAtom)
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
        values: {
            first_name: ''
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createContact(values).then(() => {
            form.reset()
            onOpenChange(false)
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
                    <ModalHeader className="flex flex-col gap-1">New contact</ModalHeader>
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
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </Form>
                </>
            )}
        </ModalContent>
    </Modal>;
}