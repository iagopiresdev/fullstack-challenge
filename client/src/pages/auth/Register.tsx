import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import aichanpc from "../../assets/aichan.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import MessageCard from "../../components/card/MessageCard";
import { motion } from "framer-motion";
import { useUser } from "../../components/UserContext";

const signUpFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type CreateUserFormData = z.infer<typeof signUpFormSchema>;

function Register() {
  const { setUser } = useUser();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleRegisterError = (errorCode: string | unknown) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setStatusMessage("Email is already in use by another account");
        break;
      case "auth/weak-password":
        setStatusMessage("Password must be stronger");
        break;
      case "confirmPassword":
        setStatusMessage("Passwords do not match");
        break;
      default:
        setStatusMessage("Error creating user");
        break;
    }
  };

  const handleRegister = async (data: CreateUserFormData) => {
    setIsLoading(true);
    try {
      const response = await Promise.race([
        fetch(`${import.meta.env.VITE_API_HOST}/users`, {
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
        handleRegisterError(errorData.errorCode);
        console.error("Failed to register user");
      } else {
        const responseData = await response.json();
        setUser(responseData);
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      if (error) handleRegisterError(error);
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
        className="md:min-w-[55%] md:min-h-full items-center p-4 md:pt-10"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="text-[36px] font-bold flex items-center justify-center flex-col mt-[0px] md:mt-0">
          <motion.h1 whileTap={{ scale: 0.9 }}>CREATE AN</motion.h1>
          <motion.h1 className="text-[#5800FF]" whileTap={{ scale: 0.9 }}>
            ACCOUNT
          </motion.h1>
        </div>
        {statusMessage && <MessageCard message={statusMessage} />}
        <form
          className="w-full max-w-md mt-4 md:mt-[80px] mx-auto flex flex-col gap-7 items-center justify-center md:max-w-xl"
          onSubmit={handleSubmit(handleRegister)}
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
              placeholder="Enter your email"
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
              Password
            </motion.label>
            <motion.input
              type="password"
              className="min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none placeholder-slate-300 placeholder:text-sm md:min-w-[500px]"
              placeholder="Enter your password"
              {...register("password")}
              whileFocus={{ scale: 1.05 }}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <motion.label
              htmlFor="confirmPassword"
              className="uppercase font-bold px-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Confirm Password
            </motion.label>
            <motion.input
              type="password"
              className="min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none placeholder-slate-300 placeholder:text-sm md:min-w-[500px]"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              whileFocus={{ scale: 1.05 }}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="relative min-w-[340px] h-[50px] mt-4 md:mt-[55px] bg-[#5800FF] rounded-2xl font-bold text-white uppercase text-center py-3 flex items-center justify-center md:min-w-[500px]"
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
          <Link
            to="/login"
            className="min-w-[340px] h-[50px] mt-[-20px] rounded-2xl font-bold text-[#5800FF] uppercase text-center py-3 md:min-w-[500px]"
          >
            Already have an account? Log in
          </Link>
        </form>
      </motion.main>
    </motion.section>
  );
}

export default Register;
