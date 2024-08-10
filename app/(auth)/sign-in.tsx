import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/../(tabs)/home");
    } catch (error: any) {
      Alert.alert("error in submit", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="items-center w-full h-full px-4 my-4">
            <Image
              source={images.logo}
              className="w-[115px] h-[34px]"
              resizeMode="contain"
            />

            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold text-center">
              {" "}
              Log in to Aora
            </Text>

            <FormField
              title="Email Address"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-5"
              placeHolder="Enter your email address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-5"
              placeHolder="Enter your Password"
            />

            <CustomButton
              title="Log in"
              handlePress={submit}
              containerStyles="mt-7 w-[200] h-[34px]"
              textStyles={""}
              isLoading={isSubmitting}
            />

            <View className="flex flex-row justify-center items-center mt-5">
              <Text className="text-white font-pmedium text-base">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-secondary font-pmedium text-base ml-1"
              >
                Sign up
              </Link>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default SignIn;
