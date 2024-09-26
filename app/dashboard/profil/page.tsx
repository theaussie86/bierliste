import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import ProfileModal from "../../../components/ProfileModal";
import OpenModalButton from "@/components/OpenModalButton";

async function ProfilePage() {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const { isGranted } = await getPermission("update:self");

  return (
    <>
      <section>
        <h1 className="text-3xl md:text-4xl font-extrabold">Profil</h1>
        <dl className="mt-6 divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Vorname
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.given_name}</span>
              {isGranted ? <OpenModalButton selector="#modal-form" /> : null}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nachname
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.family_name}</span>
              {isGranted ? <OpenModalButton selector="#modal-form" /> : null}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              E-Mail-Adresse
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user.email}</span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Teams
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">AH</span>
            </dd>
          </div>
        </dl>
      </section>
      <ProfileModal user={user} />
    </>
  );
}

export default ProfilePage;
