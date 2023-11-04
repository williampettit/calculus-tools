"use client";

import Latex from "react-latex-next";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const SolveIntegralFormSchema = z.object({
  integrand: z.string().min(1),
  variable_of_integration: z.string().min(1),
});

export function SolveIntegralForm() {
  const [resultLatex, setResultLatex] = useState<string>();

  const form = useForm<z.infer<typeof SolveIntegralFormSchema>>({
    resolver: zodResolver(SolveIntegralFormSchema),
    defaultValues: {
      integrand: "",
      variable_of_integration: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SolveIntegralFormSchema>) {
    fetch("http://localhost:4444/api/integrate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setResultLatex(response.latex);
        toast({
          title: "Solved",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: String(err),
        });
      });
  }

  return (
    <div className="flex flex-col space-y-8">
      {resultLatex && (
        <div className="p-4 border rounded-md flex flex-col space-y-2">
          <h2 className="text-sm font-bold">Result</h2>
          <Latex>{`$${resultLatex}$`}</Latex>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="integrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Integrand</FormLabel>
                <FormControl>
                  <Input placeholder="3*x**2 + 2*x + 1" {...field} />
                </FormControl>
                <FormDescription>
                  This is the function you are integrating.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variable_of_integration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variable of Integration</FormLabel>
                <FormControl>
                  <Input placeholder="x" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of the variable you are integrating with
                  respect to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Solve</Button>
        </form>
      </Form>
    </div>
  );
}
