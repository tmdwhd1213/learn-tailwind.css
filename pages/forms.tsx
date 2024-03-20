import { FieldErrors, useForm } from "react-hook-form";

// Less code ✔
// Better validation ✔
// Better Errors (set, clear, display)
// Have control over inputs
// Don't deal with events ✔
// Easier Inputs ✔

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  // watch => register가 있는 부분이 변화하면 리랜더링이 일어날 때마다 감시함.
  // handleSubmit(onValid, onInvalid) 유효한지, 유효하지 않은지 받음.
  //    {...register(_, {
  //     require: '여기에 사용자에게 보내질 메세지를 적을 수 있음.',
  //     minLength: 5 // 이러면 onInvalid(errors)의 errors.type으로 무슨 종류의 유효성 검사에서 걸렸는지
  //     // 확인 가능함.
  //   })
  // }

  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = (data: LoginForm) => {
    console.log(data);
    setError("username", { message: "Taken username" });
    // reset(); // 전체 리셋
    resetField("password"); //리셋 필드
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  // console.log(watch());
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              message: "Username should be longer than 5 characters",
              value: 5,
            },
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username?.message}
        <input
          {...register("email", {
            required: "email is required",
            validate: {
              notDaum: (value) =>
                !value.includes("@daum.net") || "Daum is not allowed",
            },
          })}
          type="email"
          placeholder="Email"
          className={`${
            Boolean(errors.email?.message) ? "border-red-500" : ""
          }`}
        />
        {errors.email?.message}
        <input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Create Account" />
        {errors.errors?.message}
      </form>
    </>
  );
}

// export default function Forms() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formError, setFormError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setUsername(value);
//   };
//   const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setEmailError("");
//     setEmail(value);
//   };
//   const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setPassword(value);
//   };
//   const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (username === "" || email === "" || password === "") {
//       setFormError("All fields are required!");
//     }
//     if (!email.includes("@")) {
//       setEmailError("email Error!");
//     }
//   };
//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <input
//           value={username}
//           onChange={onUsernameChange}
//           type="text"
//           placeholder="Username"
//           required
//           minLength={5}
//         />
//         <input
//           value={email}
//           onChange={onEmailChange}
//           type="email"
//           placeholder="Email"
//           required
//         />
//         {emailError}
//         <input
//           value={password}
//           onChange={onPasswordChange}
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <input type="submit" value="Create Account" />
//       </form>
//       <h1>username: {username}</h1>
//       <h1>Email: {email}</h1>
//       <h1>password: {password}</h1>
//     </>
//   );
// }
