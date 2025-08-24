"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function TermsModal({ trigger }) {
    return (
        <Dialog>
            {/* Trigger Button */}
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent className="max-w-md sm:max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Terms & Conditions
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-foreground mb-3">
                    <p>
                        These are the Terms and Conditions governing the use of this Service
                        and the agreement that operates between You and the Company. These
                        Terms and Conditions set out the rights and obligations of all users
                        regarding the use of the Service.
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on Your
                        acceptance of and compliance with these Terms and Conditions. These
                        Terms and Conditions apply to all visitors, users and others who
                        access or use the Service.
                    </p>
                    <p>
                        By accessing or using the Service You agree to be bound by these
                        Terms and Conditions. If You disagree with any part of these Terms
                        and Conditions then You may not access the Service.
                    </p>
                    <p>
                        You represent that you are over the age of 18. The Company does not
                        permit those under 18 to use the Service.
                    </p>
                    <p>
                        Your access to and use of the Service is also conditioned on Your
                        acceptance of and compliance with the Privacy Policy of the Company.
                        Please read Our Privacy Policy carefully before using Our Service.
                    </p>
                </div>

                <div className="flex justify-start">
                    <DialogClose asChild>
                        <Button variant="default" className="cursor-pointer w-25">Close</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
