<script lang="ts" setup>
import { ref } from "vue";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
mode.value = "light";

import { useUserStore } from '../store/userStore';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";

import GithubIcon from "@/icons/Github.vue";
import ChangeTheme from "./ChangeTheme.vue";
import { RouterLink } from 'vue-router'


import { computed } from 'vue';

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const username = computed(() => userStore.username);

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "/vaults",
    label: "Vaults",
  },
  {
    href: "/passwords",
    label: "Passwords",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
];

function logout() {
  userStore.logout();
}
</script>

<template>
  <header
    :class="{
      'shadow-light': mode === 'light',
      'shadow-dark': mode === 'dark',
      'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md mt-4': true,
    }"
  >
    <a
      href="/"
      class="font-bold text-lg flex items-center ml-3"
    >
      AwesomePass</a
    >

    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger class="bg-card text-base">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div class="grid w-[600px] grid-cols-2 gap-5 p-4">
              <img
                src="https://cdn.dribbble.com/userupload/3915661/file/original-b3cfb5652ebdfb32647f6c6b7de254d1.png?resize=2048x1536"
                alt="Beach"
                class="h-full w-full rounded-md object-cover"
              />
              <ul class="flex flex-col gap-2">
                <li
                  v-for="{ title, description } in featureList"
                  :key="title"
                  class="rounded-md p-3 text-sm hover:bg-muted"
                >
                  <p class="mb-1 font-semibold leading-none text-foreground">
                    {{ title }}
                  </p>
                  <p class="line-clamp-2 text-muted-foreground">
                    {{ description }}
                  </p>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button
              v-for="{ href, label } in routeList"
              :key="label"
              as-child
              variant="ghost"
              class="justify-start text-base"
            >
            <RouterLink :to="href">
              {{ label }}
            </RouterLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="hidden lg:flex">
<!--       <ChangeTheme />-->

      <!-- <Button
        as-child
        size="sm"
        variant="ghost"
        aria-label="View on GitHub"
      >
        <a
          aria-label="View on GitHub"
          href="https://github.com/guiRodrigues/projeto-final-web"
          target="_blank"
        >
          <GithubIcon class="size-5" />
        </a>
      </Button> -->
      <RouterLink v-if="!isAuthenticated" to="/login">
        <Button>Login</Button>
      </RouterLink>
      <div v-else>
        <span>Olá, {{ username }}!</span>
        <Button class="mx-3" @click="logout">Logout</Button>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
