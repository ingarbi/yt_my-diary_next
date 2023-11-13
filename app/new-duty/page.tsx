import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewDuty() {
  async function newDuty(formData: FormData) {
    "use server";
    const duty = formData.get("duty");
    await kv.hset("duties", { [duty as string]: {} });
    revalidatePath("/");
    redirect("/");
  }

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-4xl font-light text-center text-white font-display">
        new duty
      </h1>

      <form action={newDuty} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="duty"
          id="duty"
          className="p-2 font-sans text-xl text-white rounded-md bg-neutral-800"
        />
        <button
          type="submit"
          className=" text-neutral-900 bg-[#45EDAD] font-display font-regular text-2xl p-2 rounded-md mt-8"
        >
          Save
        </button>
        <button
          type="submit"
          className=" text-neutral-900 bg-[#ed454d] font-display font-regular text-2xl p-2 rounded-md mt-8"
        >
          Cancel
        </button>
      </form>
    </main>
  );
}
