import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import useUser from "@/libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@/libs/client/useMutation";
import Image from "next/legacy/image";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name) {
      return setError("formErrors", {
        message:
          "Email 혹은 전화번호 중 하나는 필수에요. 다시 한번 확인해주세요",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      // ask for CF URL
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      // upload file to CF URL
      const form = new FormData();
      form.append("file", avatar[0], `${user?.id}`);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/_1Z9DXKHd556cOnXoC-KAA/${user?.avatar}/avatar`
      );
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file)); // blob까지 적어줘야 IMG가 나옴 blob:http://localhost:3000/56fe91f3-bc1b-4e0d-98f0-8d13afc32790
    }
  }, [avatar]);
  return (
    <Layout seoTitle="PROFILE" canGoBack title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt={`${user?.name}'s avatar`}
              width={48}
              height={48}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            사진 수정
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          required={false}
          register={register("name")}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          required={false}
          register={register("email")}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          required={false}
          register={register("phone")}
          label="Phone number"
          name="phone"
          type="tel"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text={loading ? "Loading..." : "완료"}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;
