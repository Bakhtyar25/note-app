import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

type Props = {}

export default function LogOut({ }: Props) {
    return (
        <Dialog>
            <div className=''>
                <DialogTrigger asChild>
                    <button className='btn-auth bg-transparent text-black hover:bg-foreground/20 transition-all duration-200'>
                        Logout
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center mt-2 text-primary font-bold text-2xl'>Do You Want to <span className='text-red-500'>Logout</span>?</DialogTitle>
                        <DialogDescription className='text-center text-primary w-2/3 mx-auto'>Please confirm if You want to logout</DialogDescription>
                    </DialogHeader>
                    <form className='flex justify-center items-center gap-4 mt-4'>
                        <DialogFooter className='flex justify-center items-center gap-4'>
                            <DialogClose asChild>
                                <Button variant="default" className='bg-success hover:bg-success/80 text-white hover:text-white'>No, Cancel</Button>
                            </DialogClose>
                            <Button type='submit' variant="destructive">Yes, Logout</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </div>
        </Dialog>
    )
}