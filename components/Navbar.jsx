import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IconBell, IconMenu2, IconTrees, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { useUserStore } from "@/store/user";

const navigation = [
  //   { name: "Product", href: "#" },
  //   { name: "Features", href: "#" },
  //   { name: "Marketplace", href: "#" },
  //   { name: "Company", href: "#" },
  { name: "Adopt", href: "adopt" },
  { name: "Donate", href: "donate" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Disclosure as="nav" className="bg-base-200">
      {({ open }) => (
        <>
          <div className="container px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 duration-300 rounded-md text-base-content hover:bg-primary hover:text-base-content focus:outline-none focus:ring-2 focus:ring-inset focus:ring-base-content">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IconX className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <IconMenu2 className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Link href="/" className="flex items-center flex-shrink-0">
                  <IconTrees size={30} className="text-primary" />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-base-content text-base-content"
                            : "hover:bg-primary hover:text-primary-content",
                          "rounded-md px-3 py-2 text-sm font-medium duration-200"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-base-content text-base-content"
                      : "text-neutral-content hover:bg-primary hover:text-white",
                    "duration-200 block rounded-md px-3 py-3 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function ProfileDropdown() {
  const { userStore } = useUserStore();

  return !userStore.id ? (
    <Link href="/login" className="btn btn-primary">
      Login
    </Link>
  ) : (
    <Menu as="div" className="relative ml-3">
      <div>
        {console.log(userStore)}
        <Menu.Button className="flex items-center gap-2 p-1 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src={userStore?.photoURL}
            alt=""
          />
          <span>{userStore.username}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 text-sm origin-top-right rounded-md shadow-lg bg-base-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile"
                className={clsx(active && "bg-base-100", "block px-4 py-2 ")}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={clsx(active && "bg-base-100", "block px-4 py-2 ")}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={clsx(active && "bg-base-100", "block px-4 py-2 ")}
              >
                Sign out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}