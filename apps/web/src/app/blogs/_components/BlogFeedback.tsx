"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { feedbackSchema } from "@/validations/feedback";
import { submitFeedbackAction } from "@/actions/feedback-actions";

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function BlogFeedback({ blogId }: { blogId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const emojis = [
    { emoji: "😍", label: "Love it" },
    { emoji: "👍", label: "Good" },
    { emoji: "😐", label: "Okay" },
    { emoji: "👎", label: "Not good" },
    { emoji: "😞", label: "Poor" },
  ];

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema as any),
    defaultValues: {
      emoji: "",
      feedback: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      setIsLoading(true);

      const result = await submitFeedbackAction({
        ...data,
        anonymous: true,
        postId: blogId,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Thank you for your feedback ❤️");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className='mt-12 border-t border-theme-primary/10 pt-12 max-w-2xl'>
      <h2 className='text-2xl font-bold mb-4'>Share Your Feedback</h2>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className='space-y-6'>
          {/* Emoji */}
          <FormField
            control={form.control}
            name='emoji'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex gap-3'>
                    {emojis.map((item) => (
                      <button
                        key={item.emoji}
                        type='button'
                        onClick={() => field.onChange(item.emoji)}
                        className={`flex flex-col cursor-pointer items-center gap-1 w-14 h-12 p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                          field.value === item.emoji
                            ? "border-theme-primary bg-theme-primary/10"
                            : "border-gray-200 hover:border-theme-primary/30 dark:border-gray-500"
                        }`}
                        title={item.label}
                      >
                        <span className='text-2xl'>{item.emoji}</span>
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='feedback'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write your thoughts (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder='Share your detailed feedback here...' className='min-h-32 resize-none w-full' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isLoading} className='bg-theme-primary hover:bg-theme-primary/90 text-white'>
            <Send className='w-4 h-4 mr-2' />
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </Form>

    </div>
  );
}
