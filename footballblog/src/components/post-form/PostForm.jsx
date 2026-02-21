import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.Title || "",
      slug: post?.$id || "",
      content: post?.Content || "",
      status: post?.Status || "active",
      categories: post?.categories || [],
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [focusMode, setFocusMode] = useState(false);

  // 🔥 Slug Generator
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  // 🔥 Auto update slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // 🔥 Submit
  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          Title: data.title,
          Content: data.content,
          Status: data.status,
          categories: data.categories,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await appwriteService.createPost({
            slug: data.slug,
            title: data.title,
            content: data.content,
            featuredImage: file.$id,
            status: data.status,
            userId: userData.$id,
            categories: data.categories,
          });

          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("PostForm Submit Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`grid grid-cols-1 gap-8 transition-all duration-500 ${
        focusMode ? "lg:grid-cols-1" : "lg:grid-cols-6"
      }`}
    >
      {/* LEFT SIDE - EDITOR */}
      <div
        className={`bg-[#242F4A]/80 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 shadow-xl transition-all duration-500 ${
          focusMode ? "lg:col-span-1 max-w-5xl mx-auto" : "lg:col-span-4"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">
            Post Details
          </h2>

          <button
            type="button"
            onClick={() => setFocusMode(!focusMode)}
            className="text-sm px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {focusMode ? "Exit Focus Mode" : "Focus Mode"}
          </button>
        </div>

        <Input
          label="Title"
          placeholder="Enter post title..."
          classname="mb-6"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="Auto-generated slug"
          classname="mb-6"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <div className="mb-6 min-h-100">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      
      {!focusMode && (
        <div className="lg:col-span-2 bg-[#242F4A]/80 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 shadow-xl h-fit">
          <h2 className="text-xl font-semibold text-gray-100 mb-6">
            Post Settings
          </h2>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              {...register("image", { required: !post })}
            />
          </div>

          {post && (
            <div className="mb-6">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt="Preview"
                className="rounded-xl border border-gray-700"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            classname="mb-6"
            {...register("status", { required: true })}
          />

          <div className="mb-6">
            <p className="text-lg mt-3 text-gray-300 mb-3">Categories</p>

            <div className="flex flex-wrap gap-3">
              {[
                "Premier League",
                "La Liga",
                "Champions League",
                "Match Analysis",
                "Transfer News",
                "Opinion",
              ].map((category) => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="checkbox"
                    value={category}
                    {...register("categories")}
                    className="mr-2"
                  />
                  <span className="text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full py-3 text-lg ${
              post
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      )}
    </form>
  );
}

export default PostForm;