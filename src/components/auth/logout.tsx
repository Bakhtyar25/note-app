import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { logOut } from '@/actions/auth';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type Props = object

export default function LogOut({ }: Props) {
    const [isPending, startTransition] = useTransition()
    const handleLogout = () => {
        startTransition(async () => {
            await logOut()
            toast.success("Logout successful")
        })
    }
    return (
        <Dialog>
            <div className=''>
                <DialogTrigger asChild>
                    <button className='btn-auth bg-transparent text-primary hover:bg-foreground/20 transition-all duration-200'>
                        Logout
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center mt-2 text-primary font-bold text-2xl'>Do You Want to <span className='text-red-500'>Logout</span>?</DialogTitle>
                        <DialogDescription className='text-center text-primary w-2/3 mx-auto'>Please confirm if You want to logout</DialogDescription>
                    </DialogHeader>
                    <div className='flex justify-center items-center gap-4'>
                        <DialogFooter className='flex justify-center items-center gap-4'>
                            <DialogClose asChild>
                                <Button type='button' variant="default" className='bg-success hover:bg-success/80 text-white hover:text-white'>No, Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type='submit' className='w-1/2' variant="destructive" onClick={handleLogout}>
                                {isPending ? <Loader2 className='animate-spin' /> : "Yes, Logout"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}