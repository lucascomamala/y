"use client"

import * as z from "zod"
import Image from "next/image"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter, usePathname } from 'next/navigation'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { CommentValidation } from '@/lib/validations/thread'
import { addCommentToThread } from "@/lib/actions/thread.actions"
// import { createThread } from "@/lib/actions/thread.actions"

interface Props {
  threadId: string
  currentUserImg: string
  currentUserId: string
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
    form.reset()

    router.push('/')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form ml-16"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image 
                  src={currentUserImg}
                  alt="user image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border=none bg-transparent">
                <Input
                  type="text"
                  placeholder="What are your thoughts?"
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment
