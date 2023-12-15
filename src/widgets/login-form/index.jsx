import Button from "@/components/button"
import Input from "@/components/input"
import { adminLogin, adminRegister } from "@/data/data.fn"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"

const LoginForm = () => {

    const {push} = useRouter()


    const {mutate} = useMutation({
        mutationFn: adminLogin,
        mutationKey: ["admin/login"],
        onSuccess: (data) => {
            if(data?.status == 200) {
                toast.success("Profilga muvaffaqiyatli kirdingiz")
                localStorage.setItem("token", data?.token)
                push("/")
            }else if(data?.status == 401) {
                toast.error("Login yoki parol noto'g'ri")
            }else {
                toast.error("Xatolik yuz berdi qaytadan urinib ko'ring")
            }
        },
        onError: (err) => {
        } 
    })

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if(login && password) {
            const user = {
                admin_email: login,
                admin_password: password
            }
            mutate(user)
        }else {
            toast.error("Barcha joylarni to'ldiring")
        }
    }



    return (
        <section className="w-full h-screen flex items-center justify-center">
            <form onSubmit={handleFormSubmit} className="max-w-[330px] w-full border rounded-[7px] px-[30px] py-[35px]">
                <h2 className="text-xl text-center text-primary font-bold mb-10">Kirish</h2>
                <Input value={login} onChange={(e) => {setLogin(e.target.value)}} placeholder={"Login"} className={"mb-3"} />
                <Input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder={"Parol"} className={"mb-4"} />
                <Button type="submit" >Kirish</Button>
            </form>
        </section>
    )
}

export default LoginForm