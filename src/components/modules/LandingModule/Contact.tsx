import { Button, TextInput } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormTitle from "@/components/common/FormTitle";

const Contact = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleLoading = (condition: any) => {
    setLoading(condition);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact_name: "",
      contact_email: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values: any) => {
    console.log("checked", onSubmit);
  };
  return (
    <main className="md:mt-16 mt-10">
      <section className="dynamic-x-padding">
        <div className="text-white bg-red-600 rounded-xl ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={"grid grid-cols-12 gap-4 sm:gap-10 p-12"}>
              <article
                className={
                  " md:col-span-4 col-span-12 grid gap-4 place-content-center"
                }
              >
                <div className="text-3xl font-extrabold">
                  {props?.content?.phone}
                </div>
              </article>
              <article className={"md:col-span-3 col-span-12 grid gap-4"}>
                <div>
                  <Controller
                    name={"contact_name"}
                    control={control}
                    rules={{
                      required: "Required",
                    }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        type={"text"}
                        size={"lg"}
                        placeholder="Name"
                        error={errors.contact_name?.message}
                      />
                    )}
                  />
                </div>
              </article>
              <article className={"md:col-span-3 col-span-12 grid gap-4"}>
                <div>
                  <Controller
                    name={"contact_email"}
                    control={control}
                    rules={{
                      required: "Required",
                    }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        type={"text"}
                        size={"lg"}
                        placeholder="Email"
                        error={errors.contact_email?.message}
                      />
                    )}
                  />

                  <div className={"text-primary"}>
                    {errors.contact_email?.message}
                  </div>
                </div>
              </article>
              <article className="grid place-content-center justify-start">
                <button className="bg-black text-white rounded-md px-8 py-3 ">
                  Submit
                </button>
              </article>
            </section>
          </form>
        </div>
      </section>

      <section className="mt-8">
        <iframe
          src="https://maps.google.com/maps?q=Explore Institute of Hotel Management&output=embed"
          className="w-full"
          height={420}
          frameBorder={0}
          loading="lazy"
        />
      </section>
    </main>
  );
};

export default Contact;
