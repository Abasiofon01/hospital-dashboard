import { X, Phone, Mail } from "lucide-react";
import type { Hospital } from "../types";

interface HospitalDetailModalProps {
  hospital: Hospital;
  onClose: () => void;
}

const HospitalDetailModal = ({
  hospital,
  onClose,
}: HospitalDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-6 flex max-w-full pl-10">
        <div className="relative w-screen max-w-[552px] bg-white dark:bg-[#1B1B1B]">
          <div className="absolute right-0 top-0 flex pr-2 pt-4 sm:pr-4">
            <button
              onClick={onClose}
              className="rounded-md p-1 transition-colors border duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full flex-col overflow-y-auto bg-white text-gray-900 dark:bg-[#1B1B1B] dark:text-white py-6 shadow-xl">
            <div className="px-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {hospital.hospitalName}
              </h2>

              <div className="mt-4 flex items-center gap-x-4">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 transition-colors duration-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                  <span className="text-sm">
                    {hospital.phoneNumber || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 transition-colors duration-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                  <span className="text-sm">
                    {hospital.hospitalEmail || "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-0.5 text-gray-900 dark:text-white">
                  Overview
                </h3>

                <div className="flex flex-col gap-y-4 border rounded-sm border-black/20 p-4 dark:border-white/10">
                  <div className="flex items-start group">
                    <span className="inline-block w-28 text-sm transition-colors duration-200 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                      Longitude
                    </span>
                    <span className="text-sm">
                      {hospital.longitude || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-start group">
                    <span className="inline-block w-28 text-sm transition-colors duration-200 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                      Latitude
                    </span>
                    <span className="text-sm">
                      {hospital.latitude || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-start group gap-4">
                    <div className="flex flex-col items-start group">
                      <span className="inline-block w-28 text-sm transition-colors duration-200 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                        Country
                      </span>
                      <span className="text-sm">
                        {hospital.country || "N/A"}
                      </span>
                    </div>

                    <div className="flex flex-col items-start group">
                      <span className="inline-block w-28 text-sm transition-colors duration-200 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                        State
                      </span>
                      <span className="text-sm">{hospital.state || "N/A"}</span>
                    </div>

                    <div className="flex flex-col items-start group">
                      <span className="inline-block w-28 text-sm transition-colors duration-200 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                        Address
                      </span>
                      <span className="text-sm">
                        {hospital.address || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-0.5 text-gray-900 dark:text-white">
                  About
                </h3>

                <p className="text-sm px-3 py-4 leading-relaxed transition-colors duration-200 border rounded-sm text-gray-600 hover:text-gray-800 border-black/20 dark:text-gray-300 dark:hover:text-gray-200 dark:border-white/10">
                  Welcome to {hospital.hospitalName}, a premier center dedicated
                  to delivering comprehensive healthcare to our community with
                  compassion, expertise, and innovation. Since our founder
                  mission has been to provide high-quality, patient-centered
                  care that addresses both acute and long-term health needs for
                  every individual who walks through our doors. Our hospital
                  biennale state-of-the-art facilities with a team of
                  experienced physicians, nurses, and support staff—all
                  committed to your well-being and recovery at every stage of
                  life.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-0.5 text-gray-900 dark:text-white">
                  Research and Innovation
                </h3>

                <p className="text-sm px-3 py-4 leading-relaxed transition-colors duration-200 border rounded-sm text-gray-600 hover:text-gray-800 border-black/20 dark:text-gray-300 dark:hover:text-gray-200 dark:border-white/10">
                  As a forward-thinking institution, {hospital.hospitalName}{" "}
                  invests in research and clinical trials to bring the latest
                  medical breakthroughs to our patients. Our partnerships with
                  research institutions and universities help us stay at the
                  cutting edge of medicine, offering patients access to advanced
                  treatment options and clinical trials where appropriate. By
                  embracing innovation, we continuously seek better ways to
                  diagnose, treat, and prevent illness.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-0.5 text-gray-900 dark:text-white">
                  Patient-Centered Care
                </h3>

                <p className="text-sm px-3 py-4 leading-relaxed transition-colors duration-200 border rounded-sm text-gray-600 hover:text-gray-800 border-black/20 dark:text-gray-300 dark:hover:text-gray-200 dark:border-white/10">
                  Our hospital is designed for comfort and convenience. Private
                  patient rooms, attentive support services, and a healthy
                  environment help ensure faster recovery and a better overall
                  experience from streamlined appointment scheduling to on-site
                  amenities such as a family lounge, cafeteria, and wellness
                  programs, every aspect of our hospital is created with the
                  patient and their family in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailModal;
