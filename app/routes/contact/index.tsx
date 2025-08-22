import { Form } from "react-router";
import type { Route } from "./+types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email') as string
  const subject = formData.get('subject')
  const message = formData.get('message')

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Name required'
  if (!email)
    errors.email = 'Email required'
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    errors.email = 'Invalid Email'
  if (!subject) errors.subject = 'Subject required'
  if (!message) errors.message = 'Message required'

  if (Object.keys(errors).length > 0)
    return { errors }

  const data = { name, email, subject, message }
  return { message: 'Form Submitted Successfully', data }
}

const contactPage = ({ actionData }: Route.ComponentProps) => {
  const erros = actionData?.errors || {}
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-12 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Contact Us</h2>
      {actionData?.message ? (
        <p className="mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md">{actionData.message}</p>
      ) : null}
      <Form method="post" className="space-y-6">
        <div className="">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
          <input type="text" id="name" name="name" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
          {erros.name && <p className="text-red-400 text-sm mt-1">{erros.name}</p>}
        </div>
        <div className="">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input type="text" id="email" name="email" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
          {erros.email && <p className="text-red-400 text-sm mt-1">{erros.email}</p>}
        </div>
        <div className="">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
          <input type="text" id="subject" name="subject" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
          {erros.subject && <p className="text-red-400 text-sm mt-1">{erros.subject}</p>}
        </div>
        <div className="">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea id="message" name="message" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
          {erros.message && <p className="text-red-400 text-sm mt-1">{erros.message}</p>}
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer">Send Message</button>
      </Form>
    </div>
  );
}

export default contactPage;