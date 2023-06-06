import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import aichanpc from "../../assets/aichan.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../../types/UserProps";
import Loader from "../../components/Loader";
import MessageCard from "../../components/card/MessageCardLogin";
import { motion } from "framer-motion";

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O E-mail é obrigatório")
    .email("O E-mail é inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function Login({
  setLoggedUser,
}: {
  setLoggedUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}) {
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const handleLoginError = (errorCode: string | unknown) => {
    switch (errorCode) {
      case "auth/user-not-found":
        setStatusMessage("Usuário não encontrado");
        break;
      case "auth/wrong-password":
        setStatusMessage("Senha inválida");
        break;
      case "auth/invalid-email":
        setStatusMessage("Email inválido");
        break;
      default:
        setStatusMessage("Erro ao realizar login");
        break;
    }
  };

  const getUser = async (data: CreateUserFormData) => {
    setIsLoading(true);
    try {
      const response = await Promise.race([
        fetch(`${import.meta.env.VITE_API_HOST}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 15000)
        ),
      ]);
      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        handleLoginError(errorData.errorCode);
        console.error("Failed to create get user");
      } else {
        const responseData = await response.json();
        setLoggedUser(responseData);
        navigate("/admin/profile");
      }
    } catch (error) {
      setIsLoading(false);
      if (error) handleLoginError(error);
      console.error(error);
    }
  };

  return (
    <motion.section
      className="h-screen min-w-full flex flex-col bg-[#f6f8ff] md:flex-row flex-wrap md:max-w-2xl max-w-md md:min-w-full md:min-h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="md:min-w-[45%] md:min-h-full "
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <img
          src={aichanpc}
          alt="Aichan"
          className="w-screen h-[125px] object-cover md:h-full md:w-[100%] mt-[-8px]"
        />
      </motion.div>
      <motion.main
        className="md:min-w-[55%] md:min-h-full items-center pt-10"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="text-[36px] font-bold flex items-center justify-center flex-col mt-[0px] md:mt-0">
          <motion.h1 whileTap={{ scale: 0.9 }}>ACESSE A</motion.h1>
          <motion.h1 className="text-[#5800FF]" whileTap={{ scale: 0.9 }}>
            YOMU MANGA
          </motion.h1>
        </div>
        {statusMessage && <MessageCard message={statusMessage} />}
        <form
          className="w-full max-w-md mt-6 md:mt-[80px] mx-auto flex flex-col gap-7 items-center justify-center md:max-w-xl"
          onSubmit={handleSubmit(getUser)}
        >
          <div className="flex flex-col gap-1">
            <motion.label
              htmlFor="email"
              className="uppercase font-bold px-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Email
            </motion.label>
            <motion.input
              type="email"
              className="min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none text-sm placeholder-slate-300 placeholder:text-sm md:min-w-[500px]"
              placeholder="Digite seu email"
              {...register("email")}
              whileFocus={{ scale: 1.05 }}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <motion.label
              htmlFor="password"
              className="uppercase font-bold px-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Senha
            </motion.label>
            <motion.input
              type="password"
              className="min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none placeholder-slate-300 placeholder:text-sm md:min-w-[500px]"
              placeholder="Digite sua senha"
              {...register("password")}
              whileFocus={{ scale: 1.05 }}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="relative min-w-[340px] h-[50px] mt-[55px] bg-[#5800FF] rounded-2xl font-bold text-white uppercase text-center py-3 flex items-center justify-center md:min-w-[500px]"
          >
            {isLoading ? <Loader /> : "Entrar"}
          </button>
          <Link
            to="/auth/sign-up"
            className="min-w-[340px] h-[50px] mt-[-20px] rounded-2xl font-bold text-[#5800FF] uppercase text-center py-3 md:min-w-[500px]"
          >
            Criar conta
          </Link>
        </form>
      </motion.main>
    </motion.section>
  );
}

export default Login;
