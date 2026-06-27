/* by Stenly */
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Terminal,
  Send,
  Loader2,
  Code,
  Zap,
  Key,
  Image as ImageIcon,
  File as FileIcon,
  Globe,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const GeminiLogo = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 65 65"
  >
    <mask
      id="maskme"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="65"
      height="65"
    >
      <path
        d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
        fill="#000"
      />
      <path
        d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
        fill="url(#prefix__paint0_linear_2001_67)"
      />
    </mask>
    <g mask="url(#maskme)">
      <g filter="url(#prefix__filter0_f_2001_67)">
        <path
          d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z"
          fill="#FFE432"
        />
      </g>
      <g filter="url(#prefix__filter1_f_2001_67)">
        <path
          d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z"
          fill="#FC413D"
        />
      </g>
      <g filter="url(#prefix__filter2_f_2001_67)">
        <path
          d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
          fill="#00B95C"
        />
      </g>
      <g filter="url(#prefix__filter3_f_2001_67)">
        <path
          d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
          fill="#00B95C"
        />
      </g>
      <g filter="url(#prefix__filter4_f_2001_67)">
        <path
          d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z"
          fill="#00B95C"
        />
      </g>
      <g filter="url(#prefix__filter5_f_2001_67)">
        <path
          d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z"
          fill="#3186FF"
        />
      </g>
      <g filter="url(#prefix__filter6_f_2001_67)">
        <path
          d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z"
          fill="#FBBC04"
        />
      </g>
      <g filter="url(#prefix__filter7_f_2001_67)">
        <path
          d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z"
          fill="#3186FF"
        />
      </g>
      <g filter="url(#prefix__filter8_f_2001_67)">
        <path
          d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z"
          fill="#749BFF"
        />
      </g>
      <g filter="url(#prefix__filter9_f_2001_67)">
        <path
          d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z"
          fill="#FC413D"
        />
      </g>
      <g filter="url(#prefix__filter10_f_2001_67)">
        <path
          d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z"
          fill="#FFEE48"
        />
      </g>
    </g>
    <defs>
      <filter
        id="prefix__filter0_f_2001_67"
        x="-19.824"
        y="13.152"
        width="39.274"
        height="43.217"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="2.46"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter1_f_2001_67"
        x="-15.001"
        y="-40.257"
        width="84.868"
        height="85.688"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="11.891"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter2_f_2001_67"
        x="-20.776"
        y="11.927"
        width="79.454"
        height="90.916"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="10.109"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter3_f_2001_67"
        x="-20.776"
        y="11.927"
        width="79.454"
        height="90.916"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="10.109"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter4_f_2001_67"
        x="-19.845"
        y="15.459"
        width="79.731"
        height="81.505"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="10.109"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter5_f_2001_67"
        x="29.832"
        y="-11.552"
        width="75.117"
        height="73.758"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="9.606"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter6_f_2001_67"
        x="-38.583"
        y="-16.253"
        width="78.135"
        height="78.758"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="8.706"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter7_f_2001_67"
        x="8.107"
        y="-5.966"
        width="78.877"
        height="77.539"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="7.775"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter8_f_2001_67"
        x="13.587"
        y="-18.488"
        width="56.272"
        height="51.81"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="6.957"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter9_f_2001_67"
        x="-15.526"
        y="-31.297"
        width="70.856"
        height="69.306"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="5.876"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <filter
        id="prefix__filter10_f_2001_67"
        x="-14.168"
        y="20.964"
        width="55.501"
        height="51.571"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation="7.273"
          result="effect1_foregroundBlur_2001_67"
        />
      </filter>
      <linearGradient
        id="prefix__paint0_linear_2001_67"
        x1="18.447"
        y1="43.42"
        x2="52.153"
        y2="15.004"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4893FC" />
        <stop offset=".27" stopColor="#4893FC" />
        <stop offset=".777" stopColor="#969DFF" />
        <stop offset="1" stopColor="#BD99FE" />
      </linearGradient>
    </defs>
  </svg>
);

const RaphaelLogo = () => (
  <svg
    viewBox="0 0 512 512"
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
  >
    <g transform="scale(32)">
      <clipPath id="prefix__a">
        <path d="M0 0h16v16H0z" />
      </clipPath>
      <g clipPath="url(#prefix__a)">
        <path
          d="M20.607 2.247c-2.917-.966-5.426 1.084-6.011 2.96 0 0-2.105 6.76-3.002 9.58-.428 1.346-1.489 3.548-3.487 3.548-1.627 0-2.463-1.527-2.816-2.437L2.865 9.431c-.281-.681.013-2.04 1.14-2.447 1.204-.432 1.978.575 2.178 1.11l3.022 7.74c.72-.928 1.178-2.438 1.476-3.507l-1.984-5.21C7.756 4.686 5.267 3.58 2.962 4.43 1.095 5.118-.702 7.474.275 10.435l2.504 6.44c.38.976 1.881 4.163 5.275 4.163 4.073 0 5.601-3.473 6.449-6.218.424-1.373 2.749-8.797 2.749-8.797.338-1.109 1.71-1.428 2.568-1.148.605.196 1.698 1.031 1.345 2.325-.066.236-1.92 6.209-2.604 8.026-.357.948-1.262 3.006-3.324 2.72-.628 1.39-1.15 2.199-1.94 2.925 2.572 1.218 6.32-.009 7.898-4.776.586-1.773 2.644-8.166 2.644-8.166.598-1.963-.469-4.768-3.232-5.682z"
          fill="url(#prefix___Linear2)"
          fillRule="nonzero"
          transform="scale(.66667)"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="prefix___Linear2"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="scale(27.95) rotate(24.687 -.447 .163)"
      >
        <stop offset="0" stopColor="#40edd8" />
        <stop offset=".02" stopColor="#38e7e2" />
        <stop offset=".08" stopColor="#28daf7" />
        <stop offset=".12" stopColor="#22d5ff" />
        <stop offset=".36" stopColor="#1abfff" />
        <stop offset=".85" stopColor="#0786fe" />
        <stop offset=".91" stopColor="#047ffe" />
        <stop offset="1" stopColor="#047ffe" />
      </linearGradient>
    </defs>
  </svg>
);


const OpenAILogo = () => (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 509.639"
  >
    <path
      fill="#fff"
      d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
    />
    <path
      fillRule="nonzero"
      d="M412.037 221.764a90.834 90.834 0 004.648-28.67 90.79 90.79 0 00-12.443-45.87c-16.37-28.496-46.738-46.089-79.605-46.089-6.466 0-12.943.683-19.264 2.04a90.765 90.765 0 00-67.881-30.515h-.576c-.059.002-.149.002-.216.002-39.807 0-75.108 25.686-87.346 63.554-25.626 5.239-47.748 21.31-60.682 44.03a91.873 91.873 0 00-12.407 46.077 91.833 91.833 0 0023.694 61.553 90.802 90.802 0 00-4.649 28.67 90.804 90.804 0 0012.442 45.87c16.369 28.504 46.74 46.087 79.61 46.087a91.81 91.81 0 0019.253-2.04 90.783 90.783 0 0067.887 30.516h.576l.234-.001c39.829 0 75.119-25.686 87.357-63.588 25.626-5.242 47.748-21.312 60.682-44.033a91.718 91.718 0 0012.383-46.035 91.83 91.83 0 00-23.693-61.553l-.004-.005zM275.102 413.161h-.094a68.146 68.146 0 01-43.611-15.8 56.936 56.936 0 002.155-1.221l72.54-41.901a11.799 11.799 0 005.962-10.251V241.651l30.661 17.704c.326.163.55.479.596.84v84.693c-.042 37.653-30.554 68.198-68.21 68.273h.001zm-146.689-62.649a68.128 68.128 0 01-9.152-34.085c0-3.904.341-7.817 1.005-11.663.539.323 1.48.897 2.155 1.285l72.54 41.901a11.832 11.832 0 0011.918-.002l88.563-51.137v35.408a1.1 1.1 0 01-.438.94l-73.33 42.339a68.43 68.43 0 01-34.11 9.12 68.359 68.359 0 01-59.15-34.11l-.001.004zm-19.083-158.36a68.044 68.044 0 0135.538-29.934c0 .625-.036 1.731-.036 2.5v83.801l-.001.07a11.79 11.79 0 005.954 10.242l88.564 51.13-30.661 17.704a1.096 1.096 0 01-1.034.093l-73.337-42.375a68.36 68.36 0 01-34.095-59.143 68.412 68.412 0 019.112-34.085l-.004-.003zm251.907 58.621l-88.563-51.137 30.661-17.697a1.097 1.097 0 011.034-.094l73.337 42.339c21.109 12.195 34.132 34.746 34.132 59.132 0 28.604-17.849 54.199-44.686 64.078v-86.308c.004-.032.004-.065.004-.096 0-4.219-2.261-8.119-5.919-10.217zm30.518-45.93c-.539-.331-1.48-.898-2.155-1.286l-72.54-41.901a11.842 11.842 0 00-5.958-1.611c-2.092 0-4.15.558-5.957 1.611l-88.564 51.137v-35.408l-.001-.061a1.1 1.1 0 01.44-.88l73.33-42.303a68.301 68.301 0 0134.108-9.129c37.704 0 68.281 30.577 68.281 68.281a68.69 68.69 0 01-.984 11.545v.005zm-191.843 63.109l-30.668-17.704a1.09 1.09 0 01-.596-.84v-84.692c.016-37.685 30.593-68.236 68.281-68.236a68.332 68.332 0 0143.689 15.804 63.09 63.09 0 00-2.155 1.222l-72.54 41.9a11.794 11.794 0 00-5.961 10.248v.068l-.05 102.23zm16.655-35.91l39.445-22.782 39.444 22.767v45.55l-39.444 22.767-39.445-22.767v-45.535z"
    />
  </svg>
);

const Top4TopLogo = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><g fillRule="nonzero"><path d="M346.955 330.224c-15.875 14.088-35.7 31.619-71.647 31.619h-21.495c-26.012 0-49.672-9.455-66.607-26.593-16.543-16.747-25.649-39.665-25.649-64.545v-29.41c0-24.88 9.106-47.799 25.65-64.545 16.934-17.138 40.594-26.579 66.606-26.579h21.495c35.99 0 55.772 17.516 71.647 31.604 16.484 14.524 30.703 27.218 68.625 27.218a109.162 109.162 0 0017.269-1.38l-.13-.334a129.909 129.909 0 00-7.974-16.382L399.4 146.99c-23.232-40.234-66.304-65.098-112.763-65.096h-50.703c-46.46-.002-89.531 24.862-112.764 65.096l-25.344 43.906c-23.224 40.238-23.224 89.968 0 130.206l25.344 43.906c23.233 40.234 66.305 65.098 112.764 65.096h50.703c46.459.002 89.53-24.862 112.763-65.096l25.345-43.833a129.909 129.909 0 007.973-16.383l.13-.32a107.491 107.491 0 00-17.268-1.452c-37.922 0-52.14 12.621-68.625 27.218" fill="#006bff"/><path d="M275.308 176.823h-21.495c-39.592 0-65.605 28.278-65.605 64.471v29.411c0 36.194 26.013 64.472 65.605 64.472h21.495c57.69 0 53.158-58.822 140.272-58.822 8.254-.009 16.49.75 24.603 2.266a130.047 130.047 0 000-45.242 134.431 134.431 0 01-24.603 2.266c-87.143 0-82.583-58.822-140.272-58.822" fill="#006bff"/><path d="M490.233 300.116a121.451 121.451 0 00-50.035-21.51v.436a130.296 130.296 0 01-7.262 25.344 95.25 95.25 0 0141.364 17.037c0 .116-.072.261-.116.392-28.788 93.217-115.55 157.228-213.112 157.228-122.358 0-223.044-100.685-223.044-223.043S138.714 32.956 261.072 32.956c97.561 0 184.324 64.012 213.112 157.229 0 .13.073.276.116.392a95.073 95.073 0 01-41.364 17.022 131.112 131.112 0 017.262 25.373 3.166 3.166 0 000 .407 121.415 121.415 0 0050.035-21.495c14.262-10.56 11.503-22.483 9.339-29.542C467.34 77.803 370.064 6 260.67 6c-137.147 0-250 112.854-250 250 0 137.146 112.853 250 250 250 109.394 0 206.67-71.803 238.902-176.342 2.164-7.059 4.923-18.983-9.34-29.542" fill="#006bff"/><path d="M432.849 207.599a107.491 107.491 0 01-17.269 1.452c-37.922 0-52.14-12.62-68.61-27.217-15.89-14.089-35.672-31.619-71.662-31.619h-21.495c-26.027 0-49.672 9.455-66.607 26.593-16.543 16.746-25.649 39.665-25.649 64.545v29.41c0 24.88 9.106 47.799 25.65 64.545 16.934 17.138 40.579 26.578 66.606 26.578h21.495c35.99 0 55.772-17.515 71.661-31.604 16.47-14.524 30.69-27.217 68.611-27.217 5.783.001 11.558.463 17.269 1.38a129.303 129.303 0 007.262-25.345c.009-.145.009-.29 0-.436a134.301 134.301 0 00-24.604-2.25c-87.143 0-82.583 58.836-140.271 58.836H253.74c-39.592 0-65.604-28.293-65.604-64.487v-29.469c0-36.193 26.012-64.471 65.604-64.471h21.496c57.688 0 53.157 58.807 140.271 58.807 8.254.015 16.49-.74 24.604-2.251v-.407a131.112 131.112 0 00-7.262-25.373" fill="#0ae8f0"/></g></svg>
);

const YoutubeLogo = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="#FF0000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const PerplexityLogo = () => (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <path
      fill="#1F1F1F"
      d="M115.613 0h280.774C459.974 0 512 52.025 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.613C52.026 509.64 0 457.614 0 394.027V115.612C0 52.025 52.026 0 115.613 0z"
    />
    <path
      fill="#fff"
      fillRule="nonzero"
      d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.83c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"
    />
  </svg>
);

const JsonHighlighter = ({ data }: { data: any }) => {
  if (!data) return null;
  const jsonString =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  const tokens = jsonString
    .split(/(".*?"|{|}|\[|]|,|:|\btrue\b|\bfalse\b|\bnull\b|\d+(?:\.\d+)?)/g)
    .filter(Boolean);

  return (
    <pre className="font-mono text-[9px] leading-relaxed whitespace-pre-wrap">
      {tokens.map((token, index) => {
        let className = "text-slate-300"; // default

        const trimmed = token.trim();
        if (trimmed.startsWith('"')) {
          const nextToken = tokens[index + 1];
          if (nextToken && nextToken.trim() === ":") {
            className = "text-purple-400"; // key
          } else {
            className = "text-emerald-400"; // string value
          }
        } else if (/^\d+/.test(trimmed)) {
          className = "text-amber-400"; // number
        } else if (trimmed === "true" || trimmed === "false") {
          className = "text-orange-400"; // boolean
        } else if (trimmed === "null") {
          className = "text-rose-400"; // null
        } else if (["{", "}", "[", "]", ",", ":"].includes(trimmed)) {
          className = "text-slate-500 font-bold"; // delimiters
        }

        return (
          <span key={index} className={className}>
            {token}
          </span>
        );
      })}
    </pre>
  );
};

const ClaudeLogo = () => (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <path
      fill="#D77655"
      d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
    />
    <path
      fill="#FCF2EE"
      fillRule="nonzero"
      d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"
    />
  </svg>
);

const DeepSeekLogo = () => (
  <svg
    className="w-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <path
      fill="#fff"
      d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
    />
    <path
      fill="#4D6BFE"
      fillRule="nonzero"
      d="M440.898 139.167c-4.001-1.961-5.723 1.776-8.062 3.673-.801.612-1.479 1.407-2.154 2.141-5.848 6.246-12.681 10.349-21.607 9.859-13.048-.734-24.192 3.368-34.04 13.348-2.093-12.307-9.048-19.658-19.635-24.37-5.54-2.449-11.141-4.9-15.02-10.227-2.708-3.795-3.447-8.021-4.801-12.185-.861-2.509-1.725-5.082-4.618-5.512-3.139-.49-4.372 2.142-5.601 4.349-4.925 9.002-6.833 18.921-6.647 28.962.432 22.597 9.972 40.597 28.932 53.397 2.154 1.47 2.707 2.939 2.032 5.082-1.293 4.41-2.832 8.695-4.186 13.105-.862 2.817-2.157 3.429-5.172 2.205-10.402-4.346-19.391-10.778-27.332-18.553-13.481-13.044-25.668-27.434-40.873-38.702a177.614 177.614 0 00-10.834-7.409c-15.512-15.063 2.032-27.434 6.094-28.902 4.247-1.532 1.478-6.797-12.251-6.736-13.727.061-26.285 4.653-42.288 10.777-2.34.92-4.801 1.593-7.326 2.142-14.527-2.756-29.608-3.368-45.367-1.593-29.671 3.305-53.368 17.329-70.788 41.272-20.928 28.785-25.854 61.482-19.821 95.59 6.34 35.943 24.683 65.704 52.876 88.974 29.239 24.123 62.911 35.943 101.32 33.677 23.329-1.346 49.307-4.468 78.607-29.27 7.387 3.673 15.142 5.144 28.008 6.246 9.911.92 19.452-.49 26.839-2.019 11.573-2.449 10.773-13.166 6.586-15.124-33.915-15.797-26.47-9.368-33.24-14.573 17.235-20.39 43.213-41.577 53.369-110.222.8-5.448.121-8.877 0-13.287-.061-2.692.553-3.734 3.632-4.041 8.494-.981 16.742-3.305 24.314-7.471 21.975-12.002 30.84-31.719 32.933-55.355.307-3.612-.061-7.348-3.879-9.245v-.003zM249.4 351.89c-32.872-25.838-48.814-34.352-55.4-33.984-6.155.368-5.048 7.41-3.694 12.002 1.415 4.532 3.264 7.654 5.848 11.634 1.785 2.634 3.017 6.551-1.784 9.493-10.587 6.55-28.993-2.205-29.856-2.635-21.421-12.614-39.334-29.269-51.954-52.047-12.187-21.924-19.267-45.435-20.435-70.542-.308-6.061 1.478-8.207 7.509-9.307 7.94-1.471 16.127-1.778 24.068-.615 33.547 4.9 62.108 19.902 86.054 43.66 13.666 13.531 24.007 29.699 34.658 45.496 11.326 16.778 23.514 32.761 39.026 45.865 5.479 4.592 9.848 8.083 14.035 10.656-12.62 1.407-33.673 1.714-48.075-9.676zm15.899-102.519c.521-2.111 2.421-3.658 4.722-3.658a4.74 4.74 0 011.661.305c.678.246 1.293.614 1.786 1.163.861.859 1.354 2.083 1.354 3.368 0 2.695-2.154 4.837-4.862 4.837a4.748 4.748 0 01-4.738-4.034 5.01 5.01 0 01.077-1.981zm47.208 26.915c-2.606.996-5.2 1.778-7.707 1.88-4.679.244-9.787-1.654-12.556-3.981-4.308-3.612-7.386-5.631-8.679-11.941-.554-2.695-.247-6.858.246-9.246 1.108-5.144-.124-8.451-3.754-11.451-2.954-2.449-6.711-3.122-10.834-3.122-1.539 0-2.954-.673-4.001-1.224-1.724-.856-3.139-3-1.785-5.634.432-.856 2.525-2.939 3.018-3.305 5.6-3.185 12.065-2.144 18.034.244 5.54 2.266 9.727 6.429 15.759 12.307 6.155 7.102 7.263 9.063 10.773 14.39 2.771 4.163 5.294 8.451 7.018 13.348.877 2.561.071 4.74-2.341 6.277-.981.625-2.109 1.044-3.191 1.458z"
    />
  </svg>
);

export default function DocsPage() {
  const [prompt, setPrompt] = useState("Halo, ceritakan singkat tentang AI!");
  const [imageUrl, setImageUrl] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const [selectedEndpoint, setSelectedEndpoint] = useState<
    | "overchat"
    | "deepseek"
    | "gemini"
    | "gpt5"
    | "vision"
    | "deepseek-sl"
    | "raphael"
    | "ytdownloader"
    | "top4top"
    | "perplexity"
    | "perplexity-2"
    | "deepseek-io"
  >("overchat");
  const [selectedModel, setSelectedModel] = useState<"chat31" | "r1" | "v32">(
    "v32",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ytdlType, setYtdlType] = useState<"audio" | "video">("audio");
  const [baseUrl, setBaseUrl] = useState("https://stenly.org");

  // Effect to handle endpoint changes
  const handleEndpointChange = (endpoint: typeof selectedEndpoint) => {
    setSelectedEndpoint(endpoint);
    if (endpoint === "ytdownloader") {
      setPrompt("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    } else if (endpoint === "top4top") {
        setPrompt("Select file to upload...");
    } else if (endpoint === "perplexity" || endpoint === "perplexity-2") {
        setPrompt("Apa perbedaan quantum physics dan classical physics?");
    } else if (endpoint === "deepseek-io") {
        setPrompt("Ceritakan tentang sejarah Indonesia secara singkat.");
    } else if (endpoint === "vision") {
        setPrompt("Apa yang ada di gambar ini?");
    } else if (endpoint === "raphael") {
        setPrompt("A futuristic neon city at night");
    } else {
        setPrompt("Halo, ceritakan singkat tentang AI!");
    }
  };

  // Endpoint handling logic
  const handleTest = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse(null);
    setActiveTab("response");

    try {
      const startTime = Date.now();
      const endpointPath =
        selectedEndpoint === "deepseek"
          ? "/api/deepseek"
          : selectedEndpoint === "gemini"
            ? "/api/gemini"
            : selectedEndpoint === "gpt5"
              ? "/api/gpt5"
              : selectedEndpoint === "vision"
                ? "/api/vision"
                : selectedEndpoint === "deepseek-sl"
                  ? "/api/deepseek-sl"
                  : selectedEndpoint === "raphael"
                    ? "/api/ai/raphael"
                    : selectedEndpoint === "ytdownloader"
                      ? "/api/downloader/youtube"
                      : selectedEndpoint === "top4top"
                        ? "/api/uploader/top4top"
                      : selectedEndpoint === "perplexity"
                        ? "/api/perplexity"
                      : selectedEndpoint === "perplexity-2"
                        ? "/api/perplexity-2"
                      : selectedEndpoint === "deepseek-io"
                        ? "/api/deepseek-io"
                        : "/api/overchat";

      const body =
        selectedEndpoint === "vision"
          ? { prompt, imageUrl }
          : selectedEndpoint === "top4top"
            ? null // handled by formData
          : selectedEndpoint === "perplexity"
            ? { q: prompt }
          : selectedEndpoint === "perplexity-2"
            ? { q: prompt, mode: "copilot", focus: "internet", model: "turbo" }
          : selectedEndpoint === "deepseek-io"
            ? { prompt }
            : selectedEndpoint === "deepseek-sl"
            ? { prompt, model: selectedModel }
            : selectedEndpoint === "raphael"
              ? { prompt }
              : selectedEndpoint === "ytdownloader"
                ? { url: prompt, type: ytdlType }
                : selectedEndpoint === "deepseek" ||
                  selectedEndpoint === "gemini"
                ? { prompt }
                : { messages: [{ role: "user", content: prompt }] };

      const res = await fetch(endpointPath, {
        method: "POST",
        ...(selectedEndpoint === "top4top" ? {
           body: (() => {
             const fd = new FormData();
             if (selectedFile) fd.append("file", selectedFile);
             return fd;
           })()
        } : {
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(body),
        })
      });

      if (!res.ok) {
        setResponse({ status: "error", error: await res.text() });
        setIsLoading(false);
        return;
      }

      if (selectedEndpoint === "raphael" || selectedEndpoint === "ytdownloader" || selectedEndpoint === "top4top" || selectedEndpoint === "perplexity" || selectedEndpoint === "perplexity-2" || selectedEndpoint === "deepseek-io") {
        const data = await res.json();
        setResponse({
          status: "success",
          code: 200,
          engine: selectedEndpoint === "perplexity-2" ? "Perplexity Search V2" : selectedEndpoint === "perplexity" ? "Perplexity AI" : selectedEndpoint === "deepseek-io" ? "DeepSeek V4-Type-IO-Scraper" : selectedEndpoint === "raphael" ? "Raphael AI" : selectedEndpoint === "top4top" ? "Top4Top Uploader" : "YT Downloader",
          ...(selectedEndpoint === "ytdownloader" ? {
              logs: [
                  "Connecting to id.tunexa.io...",
                  "Fetching CSRF tokens...",
                  "Validating Cloudflare Turnstile...",
                  "Initializing download sequence...",
                  "Polling status from server...",
                  "Finalizing media link..."
              ]
          } : selectedEndpoint === "top4top" ? {
              logs: [
                "Establishing session cookie (sid)...",
                "Buffering binary data stream...",
                "Uploading to Top4Top Secure Cloud...",
                "Parsing HTML response...",
                "Extracting direct media link..."
              ]
          } : {}),
          ...data,
        });
        setIsLoading(false);
        const endTime = Date.now();
        setResponse((prev: any) => ({
          ...prev,
          _latencyMs: endTime - startTime,
        }));
        return;
      }

      const newChatId = res.headers.get("x-chat-id");
      const newDeviceId = res.headers.get("x-device-id");
      const engine = res.headers.get("x-stenly-engine");

      const reader = res.body?.getReader();
      if (!reader) {
        setResponse({ status: "error", error: "No stream content" });
        setIsLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let currentContent = "";

      setResponse({
        status: "success",
        code: 200,
        chatId: newChatId,
        deviceId: newDeviceId,
        engine: engine,
        answer: "",
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        currentContent += chunk;

        setResponse((prev: any) => ({
          ...prev,
          answer: currentContent,
        }));
      }

      const endTime = Date.now();
      setResponse((prev: any) => ({
        ...prev,
        _latencyMs: endTime - startTime,
      }));
    } catch (err: any) {
      setResponse({ status: "error", error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <header className="px-4 md:px-6 py-2.5 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#ea4e31] flex items-center justify-center text-white font-bold text-[10px]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v5h5" />
              <path d="M3 15h6v2H3z" />
              <path d="M3 11h6v2H3z" />
            </svg>
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            Stenly API <span className="text-gray-400 ml-1">/ Docs</span>
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-slate-700 text-[10px] font-extrabold rounded-full hover:bg-gray-50 transition-colors tracking-wide shadow-sm"
        >
          <ArrowLeft className="w-3 h-3" /> KEMBALI
        </Link>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-start gap-4 p-4 md:p-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-40 lg:w-48 shrink-0 space-y-3 md:sticky md:top-20">
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
            <div className="overflow-y-auto pr-1 flex-1 space-y-4 custom-scrollbar">
              <div>
                <h3 className="text-[8px] font-extrabold tracking-widest text-gray-500 uppercase mb-2 sticky top-0 bg-white py-1 z-10">
                  AI Endpoint
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleEndpointChange("overchat")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "overchat" ? "bg-blue-50 text-blue-700 border-blue-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <ClaudeLogo />
                      <span className="text-[9px] font-extrabold">
                        Claude Haiku
                      </span>
                    </div>
                    {selectedEndpoint === "overchat" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("deepseek")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "deepseek" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <DeepSeekLogo />
                      <span className="text-[9px] font-extrabold">
                        DeepSeek V4
                      </span>
                    </div>
                    {selectedEndpoint === "deepseek" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("gemini")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "gemini" ? "bg-orange-50 text-orange-700 border-orange-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <GeminiLogo />
                      <span className="text-[9px] font-extrabold">
                        Gemini 3.1 Flash
                      </span>
                    </div>
                    {selectedEndpoint === "gemini" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("gpt5")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "gpt5" ? "bg-purple-50 text-purple-700 border-purple-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <OpenAILogo />
                      <span className="text-[9px] font-extrabold">
                        GPT 5.0 Nano
                      </span>
                    </div>
                    {selectedEndpoint === "gpt5" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("vision")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "vision" ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <OpenAILogo />
                      <span className="text-[9px] font-extrabold">
                        GPT 4o Vision
                      </span>
                    </div>
                    {selectedEndpoint === "vision" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("deepseek-sl")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "deepseek-sl" ? "bg-cyan-50 text-cyan-700 border-cyan-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <DeepSeekLogo />
                      <span className="text-[9px] font-extrabold">
                        DeepSeek SL
                      </span>
                    </div>
                    {selectedEndpoint === "deepseek-sl" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("raphael")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "raphael" ? "bg-rose-50 text-rose-700 border-rose-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <RaphaelLogo />
                      <span className="text-[9px] font-extrabold">
                        Raphael Image
                      </span>
                    </div>
                    {selectedEndpoint === "raphael" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("perplexity")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "perplexity" ? "bg-teal-50 text-teal-700 border-teal-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                        <PerplexityLogo />
                        <span className="text-[9px] font-extrabold">
                            Perplexity AI
                        </span>
                    </div>
                    {selectedEndpoint === "perplexity" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("perplexity-2")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "perplexity-2" ? "bg-teal-50 text-teal-700 border-teal-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                        <PerplexityLogo />
                        <span className="text-[9px] font-extrabold">
                            Perplexity Pro V2
                        </span>
                    </div>
                    {selectedEndpoint === "perplexity-2" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEndpointChange("deepseek-io")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "deepseek-io" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                        <DeepSeekLogo />
                        <span className="text-[9px] font-extrabold">
                            DeepSeek V4-Type-IO
                        </span>
                    </div>
                    {selectedEndpoint === "deepseek-io" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[8px] font-extrabold tracking-widest text-gray-500 uppercase mb-2 sticky top-0 bg-white py-1 z-10">
                  Downloader
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleEndpointChange("ytdownloader")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "ytdownloader" ? "bg-red-50 text-red-700 border-red-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <YoutubeLogo />
                      <span className="text-[9px] font-extrabold">
                        YT Downloader
                      </span>
                    </div>
                    {selectedEndpoint === "ytdownloader" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[8px] font-extrabold tracking-widest text-gray-500 uppercase mb-2 sticky top-0 bg-white py-1 z-10">
                  Uploader
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleEndpointChange("top4top")}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors text-left group border ${selectedEndpoint === "top4top" ? "bg-cyan-50 text-cyan-700 border-cyan-100" : "text-gray-600 hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Top4TopLogo />
                      <span className="text-[9px] font-extrabold">
                        Top4Top Upload
                      </span>
                    </div>
                    {selectedEndpoint === "top4top" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                    )}
                  </button>
                </div>
              </div>


              <div className="pt-2">
                <h3 className="text-[8px] font-extrabold tracking-widest text-gray-500 uppercase mb-2 sticky top-0 bg-white py-1 z-10">
                  Auth Config
                </h3>
                <button className="w-full flex items-center gap-1.5 px-2 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors text-[9px] font-extrabold border border-transparent">
                  <Key className="w-3 h-3 text-gray-400" /> API Keys Management
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col xl:flex-row gap-4 w-full">
          {/* Documentation Info */}
          <div className="flex-1 flex flex-col gap-3">
            <section className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl"></div>
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-1 ${
                  selectedEndpoint === "overchat"
                    ? "bg-blue-50 border-blue-100 text-blue-700"
                    : selectedEndpoint === "gemini"
                      ? "bg-orange-50 border-orange-100 text-orange-700"
                      : selectedEndpoint === "gpt5"
                        ? "bg-purple-50 border-purple-100 text-purple-700"
                        : selectedEndpoint === "vision"
                          ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                          : selectedEndpoint === "deepseek-sl"
                            ? "bg-cyan-50 border-cyan-100 text-cyan-700"
                            : selectedEndpoint === "raphael"
                              ? "bg-rose-50 border-rose-100 text-rose-700"
                            : selectedEndpoint === "top4top"
                              ? "bg-cyan-50 border-cyan-100 text-cyan-700"
                            : selectedEndpoint === "perplexity" || selectedEndpoint === "perplexity-2"
                              ? "bg-teal-50 border-teal-100 text-teal-700"
                              : "bg-emerald-50 border-emerald-100 text-emerald-700"
                } border rounded text-[8px] font-extrabold tracking-widest uppercase mb-3 shadow-sm`}
              >
                <Zap className="w-2.5 h-2.5" />{" "}
                {selectedEndpoint === "overchat"
                  ? "Ultra-Fast LLM"
                  : selectedEndpoint === "gemini"
                    ? "Next-Gen Flash"
                    : selectedEndpoint === "gpt5"
                      ? "Hyper-Tiny Engine"
                      : selectedEndpoint === "vision"
                        ? "Multi-Modal AI"
                        : selectedEndpoint === "deepseek-sl"
                          ? "3-in-1 Model SL"
                          : selectedEndpoint === "top4top"
                            ? "File Hosting"
                          : selectedEndpoint === "perplexity" || selectedEndpoint === "perplexity-2"
                            ? "AI Search Engine"
                          : selectedEndpoint === "raphael"
                            ? "AI Art Engine"
                            : selectedEndpoint === "ytdownloader"
                              ? "Media Downloader"
                              : "SOTA AI Thinking"}
              </div>

              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-2.5">
                <div className="shrink-0 p-1.5 bg-slate-50 rounded-lg border border-gray-100 shadow-sm">
                  {selectedEndpoint === "overchat" ? (
                    <ClaudeLogo />
                  ) : selectedEndpoint === "gemini" ? (
                    <GeminiLogo />
                  ) : selectedEndpoint === "gpt5" ||
                    selectedEndpoint === "vision" ? (
                    <OpenAILogo />
                  ) : selectedEndpoint === "raphael" ? (
                    <RaphaelLogo />
                  ) : selectedEndpoint === "ytdownloader" ? (
                    <YoutubeLogo />
                  ) : selectedEndpoint === "top4top" ? (
                    <Top4TopLogo />
                  ) : selectedEndpoint === "perplexity" ? (
                    <PerplexityLogo />
                  ) : selectedEndpoint === "perplexity-2" ? (
                    <PerplexityLogo />
                  ) : (
                    <DeepSeekLogo />
                  )}
                </div>
                {selectedEndpoint === "overchat"
                  ? "Claude 3.5 Haiku API"
                  : selectedEndpoint === "gemini"
                    ? "Gemini 3.1 Flash Lite API"
                    : selectedEndpoint === "gpt5"
                      ? "GPT 5.0 Nano API"
                      : selectedEndpoint === "vision"
                        ? "GPT-4o Mini Vision API"
                        : selectedEndpoint === "deepseek-sl"
                          ? "DeepSeek SL Multi-Model API"
                          : selectedEndpoint === "top4top"
                            ? "Top4Top Hosting API"
                          : selectedEndpoint === "perplexity"
                            ? "Perplexity Search API"
                          : selectedEndpoint === "perplexity-2"
                            ? "Perplexity Pro V2 API"
                          : selectedEndpoint === "deepseek-io"
                            ? "DeepSeek V4-Type-IO-Scraper (IO-Scrape) API"
                          : selectedEndpoint === "raphael"
                            ? "Raphael Art AI API"
                            : selectedEndpoint === "ytdownloader"
                              ? "YouTube MP3/MP4 API"
                              : "AI Services Engine API"}
              </h1>

              <p className="text-[10px] font-bold text-gray-600 leading-relaxed mb-4">
                {selectedEndpoint === "overchat"
                  ? "Akses model Claude paling ringan dan cepat dari Anthropic. Dioptimalkan secara sempurna untuk task seketika, asisten chat, dan parsing data dengan time-to-first-token super rendah."
                  : selectedEndpoint === "gemini"
                    ? "Preview terbaru dari Google DeepMind yang menawarkan performa kilat dengan efisiensi tinggi untuk aplikasi responsif dan hemat sumber daya."
                    : selectedEndpoint === "gpt5"
                      ? "Model efisiensi tinggi masa depan yang dioptimalkan untuk instruksi mikro dengan akurasi logika yang tajam namun hemat resource secara ekstrem."
                      : selectedEndpoint === "vision"
                        ? "Model multi-modal canggih yang mampu memahami teks dan data visual (gambar). Sempurna untuk analisis foto, ekstraksi teks dari gambar, atau deskripsi visual."
                        : selectedEndpoint === "deepseek-sl"
                          ? "Layanan DeepSeek eksclusif yang mendukung tiga varian model: V3.1 (Stabil), R1 (Penalaran/Thinking), dan V3.2 (Terbaru/Cepat). Cocok untuk berbagai kebutuhan logic dan chat."
                          : selectedEndpoint === "raphael"
                            ? "Mesin penghasil gambar AI yang sangat canggih. Mampu menghasilkan karya seni digital, ilustrasi, dan foto realistis hanya dari deskripsi teks sederhana."
                          : selectedEndpoint === "top4top"
                            ? "Layanan penyimpanan dokumen, audio, dan gambar gratis yang stabil. API ini memungkinkan Anda mengunggah file dan mendapatkan tautan langsung (direct link) secara instan."
                          : selectedEndpoint === "perplexity"
                            ? "Mesin pencari bertenaga AI yang menyediakan jawaban akurat dan ringkas dengan referensi sumber secara langsung (grounding). Sangat cocok untuk riset mendalam."
                          : selectedEndpoint === "perplexity-2"
                            ? "Versi Pro dari Perplexity AI yang mendukung mode Copilot, riset mendalam dengan banyak sumber (Internet, Social, dsb), dan ekstraksi media dalam satu respons."
                          : selectedEndpoint === "deepseek-io"
                            ? "Versi mutakhir dari DeepSeek V4 Flash yang dibangun di atas engine Type-IO-Scraper. Menggunakan teknik CSRF bypass tingkat tinggi untuk respon yang lebih stabil, tanpa limit, dan sangat responsif terhadap dialek Indonesia."
                          : selectedEndpoint === "ytdownloader"
                            ? "Layanan pengunduhan media YouTube (MP3/MP4) yang cepat dan stabil. Mendukung ekstraksi audio kualitas tinggi (320kbps) dan video hingga resolusi Full HD."
                            : "Model reasoning canggih yang dioptimalkan untuk logika pemograman, matematika, dan pemecahan masalah kompleks dengan efisiensi token yang sangat tinggi."}{" "}
                {selectedEndpoint === "ytdownloader" || selectedEndpoint === "top4top"
                  ? "API ini mengembalikan data JSON atau teks lengkap setelah proses pemrosesan selesai di sisi server (non-streaming)."
                  : "API ini secara bawaan menggunakan SSE (Server-Sent Events) atau standard streaming untuk respons realtime."}
              </p>

              <div className="flex items-center gap-2.5 bg-slate-900 p-2.5 rounded-md border border-slate-800 font-mono text-[9px] font-bold shadow-inner relative">
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                  POST
                </span>
                <span className="text-slate-300">
                  {baseUrl}/api/
                  {selectedEndpoint === "overchat"
                    ? "overchat"
                    : selectedEndpoint === "gemini"
                      ? "gemini"
                      : selectedEndpoint === "gpt5"
                        ? "gpt5"
                        : selectedEndpoint === "vision"
                          ? "vision"
                          : selectedEndpoint === "deepseek-sl"
                            ? "deepseek-sl"
                            : selectedEndpoint === "raphael"
                              ? "ai/raphael"
                            : selectedEndpoint === "ytdownloader"
                              ? "downloader/youtube"
                            : selectedEndpoint === "top4top"
                              ? "uploader/top4top"
                            : selectedEndpoint === "perplexity"
                              ? "perplexity"
                            : selectedEndpoint === "perplexity-2"
                              ? "perplexity-2"
                            : selectedEndpoint === "deepseek-io"
                              ? "deepseek-io"
                              : "deepseek"}
                </span>
              </div>
            </section>

            {/* Parameters */}
            <section className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm flex-1">
              <h3 className="text-[9px] font-extrabold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-gray-400" /> Header & Payload
              </h3>

              <div className="overflow-hidden border border-gray-100 rounded-md">
                <table className="w-full text-[9px] text-left">
                  <thead className="bg-[#f8f9fa]">
                    <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-widest font-extrabold text-[7px]">
                      <th className="py-2 px-2.5">Parameter</th>
                      <th className="py-2 px-2.5">Tipe Data</th>
                      <th className="py-2 px-2.5">Deskripsi Node</th>
                    </tr>
                  </thead>
                  <tbody className="font-extrabold text-[9px]">
                    {selectedEndpoint === "overchat" ||
                    selectedEndpoint === "gpt5" ? (
                      <>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            messages{" "}
                            <span className="text-red-500 ml-0.5">*</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                            Array
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Riwayat percakapan dengan kombinasi objek user,
                            assistant, atau system prompt.
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            chatId
                          </td>
                          <td className="py-2.5 px-2.5 text-emerald-600 font-mono text-[8px]">
                            String
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            UUID (Opsional). Digunakan untuk melanjutkan chain
                            memory pada sesi chat sebelumnya.
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            deviceId
                          </td>
                          <td className="py-2.5 px-2.5 text-emerald-600 font-mono text-[8px]">
                            String
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Identifikasi anonim perangkat untuk rate-limiting
                            atau session tracking.
                          </td>
                        </tr>
                      </>
                    ) : selectedEndpoint === "ytdownloader" ? (
                      <>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">
                                url{" "}
                                <span className="text-red-500 ml-0.5">*</span>
                              </td>
                              <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                                String
                              </td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                                Link URL video YouTube yang ingin diunduh.
                              </td>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">
                                type
                              </td>
                              <td className="py-2.5 px-2.5 text-emerald-600 font-mono text-[8px]">
                                String
                              </td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                                Jenis output: <code className="bg-gray-100 px-1">audio</code> (default) atau <code className="bg-gray-100 px-1">video</code>.
                              </td>
                            </tr>
                          </>
                        ) : selectedEndpoint === "top4top" ? (
                      <>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800 font-bold">
                            file{" "}
                            <span className="text-red-500 ml-0.5">*</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                            File Binary
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            File gambar atau dokumen (JPG, PNG, PDF, dll) yang ingin diunggah. Gunakan <code>multipart/form-data</code>.
                          </td>
                        </tr>
                      </>
                    ) : selectedEndpoint === "perplexity" ? (
                      <>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            q{" "}
                            <span className="text-red-500 ml-0.5">*</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                            String
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Pertanyaan atau topik yang ingin dicari informasinya.
                          </td>
                        </tr>
                      </>
                    ) : selectedEndpoint === "raphael" ? (
                      <>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            prompt{" "}
                            <span className="text-red-500 ml-0.5">*</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                            String
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Deskripsi visual gambar yang ingin dibuat.
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            options
                          </td>
                          <td className="py-2.5 px-2.5 text-purple-600 font-mono text-[8px]">
                            Object
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Parameter opsional: <br />
                            • <code className="bg-gray-100 px-1">aspect</code>: {"\"1:1\", \"16:9\", \"9:16\", \"3:2\", \"2:3\", \"4:5\""} <br />
                            • <code className="bg-gray-100 px-1">model_id</code>: {"\"raphael-basic\", \"raphael-pro\""} <br />
                            • <code className="bg-gray-100 px-1">negativePrompt</code>: Teks untuk hal yang dihindari <br />
                            • <code className="bg-gray-100 px-1">number_of_images</code>: Jumlah gambar (default: 4)
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="py-2.5 px-2.5 text-slate-800">
                            prompt{" "}
                            <span className="text-red-500 ml-0.5">*</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">
                            String
                          </td>
                          <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                            Input teks atau pertanyaan utama yang akan diproses
                            oleh mesin AI{" "}
                            {selectedEndpoint === "gemini"
                              ? "Gemini 3.1 Flash"
                              : selectedEndpoint === "vision"
                                ? "GPT-4o Vision"
                                : selectedEndpoint === "deepseek-sl"
                                  ? "DeepSeek SL"
                                  : selectedEndpoint === "deepseek-io"
                                    ? "DeepSeek V4-Type-IO"
                                    : "DeepSeek V4"}
                            .
                          </td>
                        </tr>
                        {selectedEndpoint === "vision" && (
                          <tr className="bg-white">
                            <td className="py-2.5 px-2.5 text-slate-800">
                              imageUrl
                            </td>
                            <td className="py-2.5 px-2.5 text-emerald-600 font-mono text-[8px]">
                              String
                            </td>
                            <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                              Link URL gambar publik (JPG/PNG) yang ingin
                              dianalisis oleh AI Vision.
                            </td>
                          </tr>
                        )}
                        {selectedEndpoint === "perplexity-2" && (
                          <>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">q / prompt</td>
                              <td className="py-2.5 px-2.5 text-red-600 font-mono text-[8px]">String</td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">Pertanyaan atau kata kunci riset yang ingin dicari.</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">mode</td>
                              <td className="py-2.5 px-2.5 text-orange-600 font-mono text-[8px]">String</td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">Mode riset: <code className="bg-gray-100 px-1 text-[7px]">concise</code> (ringkas) atau <code className="bg-gray-100 px-1 text-[7px]">copilot</code> (mendalam).</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">focus</td>
                              <td className="py-2.5 px-2.5 text-teal-600 font-mono text-[8px]">String</td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">Fokus riset: <code className="bg-gray-100 px-1 text-[7px]">internet</code>, <code className="bg-gray-100 px-1 text-[7px]">scholar</code>, <code className="bg-gray-100 px-1 text-[7px]">writing</code>, <code className="bg-gray-100 px-1 text-[7px]">youtube</code>, <code className="bg-gray-100 px-1 text-[7px]">reddit</code>.</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">model</td>
                              <td className="py-2.5 px-2.5 text-indigo-600 font-mono text-[8px]">String</td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">Model AI: <code className="bg-gray-100 px-1 text-[7px]">turbo</code> (cepat) atau <code className="bg-gray-100 px-1 text-[7px]">experimental</code>.</td>
                            </tr>
                            <tr className="border-b border-gray-100 bg-white">
                              <td className="py-2.5 px-2.5 text-slate-800">language</td>
                              <td className="py-2.5 px-2.5 text-blue-600 font-mono text-[8px]">String</td>
                              <td className="py-2.5 px-2.5 text-gray-600 leading-snug">Bahasa jawaban (default: <code className="bg-gray-100 px-1 text-[7px]">en-US</code>).</td>
                            </tr>
                          </>
                        )}
                        {selectedEndpoint === "deepseek-sl" && (
                          <tr className="bg-white">
                            <td className="py-2.5 px-2.5 text-slate-800">
                              model
                            </td>
                            <td className="py-2.5 px-2.5 text-purple-600 font-mono text-[8px]">
                              String
                            </td>
                            <td className="py-2.5 px-2.5 text-gray-600 leading-snug">
                              Varian model:{" "}
                              <code className="bg-gray-100 px-1">chat31</code>,{" "}
                              <code className="bg-gray-100 px-1">r1</code>{" "}
                              (Thinking), atau{" "}
                              <code className="bg-gray-100 px-1">v32</code>{" "}
                              (Default).
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Implementation Examples */}
            <section className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm flex-none">
              <h3 className="text-[9px] font-extrabold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-gray-400" /> Full Integration
                Guide
              </h3>

              <div className="space-y-8">
                {/* Step by Step Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-[10px] font-extrabold text-slate-800">
                        Siapkan Request POST
                      </h4>
                      <p className="text-[9px] font-medium text-gray-500">
                        Lakukan request ke endpoint kami menggunakan metode POST
                        dengan format {selectedEndpoint === "top4top" ? "multipart/form-data" : "JSON"}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terminal / cURL */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-slate-700">
                      Terminal / Bash (cURL)
                    </span>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden shadow-sm">
                    <pre className="p-3 text-slate-300 font-mono text-[9px] overflow-x-auto leading-relaxed">
                      <span className="text-emerald-400">curl</span> -X POST <span className="text-amber-300">{`"${baseUrl}/api/${selectedEndpoint === "overchat" ? "overchat" : selectedEndpoint === "gemini" ? "gemini" : selectedEndpoint === "gpt5" ? "gpt5" : selectedEndpoint === "vision" ? "vision" : selectedEndpoint === "deepseek-sl" ? "deepseek-sl" : selectedEndpoint === "raphael" ? "ai/raphael" : selectedEndpoint === "ytdownloader" ? "downloader/youtube" : selectedEndpoint === "top4top" ? "uploader/top4top" : selectedEndpoint === "perplexity" ? "perplexity" : selectedEndpoint === "perplexity-2" ? "perplexity-2" : selectedEndpoint === "deepseek-io" ? "deepseek-io" : "deepseek"}"`}</span> \
                      <br />  -H <span className="text-amber-300">{selectedEndpoint === "top4top" ? "\"Content-Type: multipart/form-data\"" : "\"Content-Type: application/json\""}</span> \
                      <br />  {selectedEndpoint === "top4top" ? (
                        <span className="text-amber-300">-F {"\"file=@/path/to/your/file.jpg\""}</span>
                      ) : (
                        <>
                          -d <span className="text-amber-300">{"'"}</span>{JSON.stringify(
                            selectedEndpoint === "vision"
                              ? { prompt: "Analysis...", imageUrl: "https://img.com/p.jpg" }
                              : selectedEndpoint === "deepseek-sl"
                                ? { prompt: "Hello", model: "v32" }
                                : selectedEndpoint === "raphael"
                                  ? { prompt: "Mountain landscape" }
                                  : selectedEndpoint === "ytdownloader"
                                    ? { url: "https://youtu.be/...", type: "audio" }
                                  : selectedEndpoint === "perplexity"
                                    ? { q: "Apa itu Metaverse?" }
                                  : selectedEndpoint === "perplexity-2"
                                    ? { q: "Artificial Intelligence", mode: "copilot", model: "turbo", focus: "internet" }
                                  : selectedEndpoint === "deepseek-io"
                                    ? { prompt: "Halo, jelaskan tentang Quantum Computing" }
                                      : selectedEndpoint === "overchat" ||
                                      selectedEndpoint === "gpt5"
                                      ? { messages: [{ role: "user", content: "Hello" }] }
                                      : { prompt: "Hello" }
                          )}<span className="text-amber-300">{"'"}</span>
                        </>
                      )}
                    </pre>
                  </div>
                </div>

                {/* Python */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-slate-700">
                      Python (Requests)
                    </span>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden shadow-sm">
                    <pre className="p-3 text-slate-300 font-mono text-[9px] overflow-x-auto leading-relaxed">
                      <span className="text-purple-400">import</span> requests,
                      json url <span className="text-purple-400">=</span>{" "}
                      <span className="text-amber-300">{`"${baseUrl}/api/${selectedEndpoint === "overchat" ? "overchat" : selectedEndpoint === "gemini" ? "gemini" : selectedEndpoint === "gpt5" ? "gpt5" : selectedEndpoint === "vision" ? "vision" : selectedEndpoint === "deepseek-sl" ? "deepseek-sl" : selectedEndpoint === "raphael" ? "ai/raphael" : selectedEndpoint === "ytdownloader" ? "downloader/youtube" : selectedEndpoint === "top4top" ? "uploader/top4top" : selectedEndpoint === "perplexity" ? "perplexity" : selectedEndpoint === "perplexity-2" ? "perplexity-2" : selectedEndpoint === "deepseek-io" ? "deepseek-io" : "deepseek"}"`}</span>
                      {selectedEndpoint === "top4top" ? (
                        <>
                          files <span className="text-purple-400">=</span> {"{"}
                          <span className="text-blue-300">{'"file"'}</span>: <span className="text-blue-400">open</span>(<span className="text-amber-300">{'"document.pdf"'}</span>, <span className="text-amber-300">{'"rb"'}</span>)
                          {"}"}
                          <br />
                          response <span className="text-purple-400">=</span>{" "}
                          requests.<span className="text-blue-400">post</span>(url, files<span className="text-purple-400">=</span>files)
                        </>
                      ) : (
                        <>
                          payload <span className="text-purple-400">=</span> {"{"}
                          {selectedEndpoint === "vision"
                            ? <span className="text-blue-300">{'"prompt"'}</span> +
                              ': "Siapa nama mobil ini?", ' +
                              (
                                <span className="text-blue-300">
                                  {'"imageUrl"'}
                                </span>
                              ) +
                              ': "https://url.com/img.jpg"'
                            : selectedEndpoint === "deepseek-sl"
                              ? (
                                  <span className="text-blue-300">
                                    {'"prompt"'}
                                  </span>
                                ) +
                                ': "Apa kabar?", ' +
                                <span className="text-blue-300">{'"model"'}</span> +
                                ': "r1"'
                              : selectedEndpoint === "raphael"
                                ? (
                                    <span className="text-blue-300">
                                      {'"prompt"'}
                                    </span>
                                  ) + ': "A beautiful sunset over a mirror lake"'
                                : selectedEndpoint === "ytdownloader"
                                  ? `{ url: "https://youtu.be/...", type: "audio" }`
                                  : selectedEndpoint === "overchat" ||
                                    selectedEndpoint === "gpt5"
                                  ? (
                                      <span className="text-blue-300">
                                        {'"messages"'}
                                      </span>
                                    ) + ': [{"role": "user", "content": "Halo AI"}]'
                                  : selectedEndpoint === "perplexity"
                                    ? (
                                        <span className="text-blue-300">
                                          {'"q"'}
                                        </span>
                                      ) + ': "Apa itu Metaverse?"'
                                    : selectedEndpoint === "perplexity-2"
                                      ? (
                                          <span className="text-blue-300">
                                            {'"q"'}
                                          </span>
                                        ) + ': "Artificial Intelligence", ' +
                                        <span className="text-blue-300">{'"mode"'}</span> + ': "copilot", ' +
                                        <span className="text-blue-300">{'"focus"'}</span> + ': "internet"'
                                  : (
                                      <span className="text-blue-300">
                                        {'"prompt"'}
                                      </span>
                                    ) + ': "Halo AI"'}
                          {"}"}
                          <br />
                          response <span className="text-purple-400">=</span>{" "}
                          requests.<span className="text-blue-400">post</span>(url,
                          json<span className="text-purple-400">=</span>payload,
                          stream<span className="text-purple-400">=</span>
                          <span className="text-blue-300">True</span>)
                        </>
                      )}
                      <span className="text-purple-400">for</span> chunk{" "}
                      <span className="text-purple-400">in</span> response.
                      <span className="text-blue-400">iter_content</span>
                      (chunk_size<span className="text-purple-400">=</span>
                      <span className="text-blue-300">None</span>):
                      <span className="text-purple-400">if</span> chunk:
                      print(chunk.<span className="text-blue-400">decode</span>(
                      <span className="text-amber-300">{"'utf-8'"}</span>), end
                      <span className="text-purple-400">=</span>
                      <span className="text-amber-300">{"''"}</span>, flush
                      <span className="text-purple-400">=</span>
                      <span className="text-blue-300">True</span>)
                    </pre>
                  </div>
                </div>

                {/* Node.js */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-slate-700">
                      Node.js (Streaming Fetch)
                    </span>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden shadow-sm">
                    <pre className="p-3 text-slate-300 font-mono text-[9px] overflow-x-auto leading-relaxed">
                      <span className="text-purple-400">const</span> response{" "}
                      <span className="text-purple-400">=</span>{" "}
                      <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-400">fetch</span>(
                      <span className="text-amber-300">{`"${baseUrl}/api/${selectedEndpoint === "overchat" ? "overchat" : selectedEndpoint === "gemini" ? "gemini" : selectedEndpoint === "gpt5" ? "gpt5" : selectedEndpoint === "vision" ? "vision" : selectedEndpoint === "deepseek-sl" ? "deepseek-sl" : selectedEndpoint === "raphael" ? "ai/raphael" : selectedEndpoint === "ytdownloader" ? "downloader/youtube" : selectedEndpoint === "top4top" ? "uploader/top4top" : selectedEndpoint === "perplexity" ? "perplexity" : selectedEndpoint === "perplexity-2" ? "perplexity-2" : selectedEndpoint === "deepseek-io" ? "deepseek-io" : "deepseek"}"`}</span>
                      , {"{"}
                      method: <span className="text-amber-300">{'"POST"'}</span>
                      {selectedEndpoint === "top4top" ? (
                        <>
                          , body: <span className="text-purple-400">new</span> <span className="text-amber-400">FormData</span>() 
                          <span className="text-slate-500">{"// append file to formData"}</span>
                        </>
                      ) : (
                        <>
                          , headers: {"{"}{" "}
                          <span className="text-amber-300">{'"Content-Type"'}</span>
                          :{" "}
                          <span className="text-amber-300">
                            {'"application/json"'}
                          </span>{" "}
                          {"}"}, body: <span className="text-amber-400">JSON</span>.
                          <span className="text-blue-400">stringify</span>(
                          {selectedEndpoint === "vision"
                            ? `{ prompt: "Analisis gambar ini", imageUrl: "https://site.com/image.png" }`
                            : selectedEndpoint === "deepseek-sl"
                              ? `{ prompt: "Node JS itu apa?", model: "r1" }`
                              : selectedEndpoint === "raphael"
                                ? `{ prompt: "Generate futuristic city" }`
                                : selectedEndpoint === "ytdownloader"
                                  ? `{ url: "https://youtu.be/...", type: "audio" }`
                                  : selectedEndpoint === "overchat" ||
                                    selectedEndpoint === "gpt5"
                                ? `{ messages: [{ role: "user", content: "Hello" }] }`
                                : selectedEndpoint === "perplexity"
                                  ? `{ q: "Apa itu Metaverse?" }`
                                  : selectedEndpoint === "perplexity-2"
                                    ? `{ q: "AI Pro", mode: "copilot", model: "turbo", focus: "internet" }`
                                  : selectedEndpoint === "deepseek-io"
                                    ? `{ prompt: "Halo DeepSeek" }`
                                : `{ prompt: "Hello" }`}
                          )
                        </>
                      )}
                      {"}"});
                      <span className="text-purple-400">const</span> reader{" "}
                      <span className="text-purple-400">=</span> response.body?.
                      <span className="text-blue-400">getReader</span>();
                      <span className="text-purple-400">while</span> (
                      <span className="text-blue-300">true</span>) {"{"}
                      <span className="text-purple-400">const</span> {"{"} done,
                      value {"}"} <span className="text-purple-400">=</span>{" "}
                      <span className="text-purple-400">await</span> reader.
                      <span className="text-blue-400">read</span>();
                      <span className="text-purple-400">if</span> (done){" "}
                      <span className="text-purple-400">break</span>;
                      process.stdout.
                      <span className="text-blue-400">write</span>(
                      <span className="text-purple-400">new</span>{" "}
                      <span className="text-amber-400">TextDecoder</span>().
                      <span className="text-blue-400">decode</span>(value));
                      {"}"}
                    </pre>
                  </div>
                </div>

                {/* PHP */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-slate-700">
                      PHP (Native cURL)
                    </span>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden shadow-sm">
                    <pre className="p-3 text-slate-300 font-mono text-[9px] overflow-x-auto leading-relaxed">
                      <span className="text-slate-500">&lt;?php</span>
                      <span className="text-blue-300">$ch</span> = curl_init(
                      <span className="text-amber-300">{`"${baseUrl}/api/${selectedEndpoint === "overchat" ? "overchat" : selectedEndpoint === "gemini" ? "gemini" : selectedEndpoint === "gpt5" ? "gpt5" : selectedEndpoint === "vision" ? "vision" : selectedEndpoint === "deepseek-sl" ? "deepseek-sl" : selectedEndpoint === "raphael" ? "ai/raphael" : selectedEndpoint === "ytdownloader" ? "downloader/youtube" : selectedEndpoint === "top4top" ? "uploader/top4top" : selectedEndpoint === "perplexity" ? "perplexity" : selectedEndpoint === "perplexity-2" ? "perplexity-2" : selectedEndpoint === "deepseek-io" ? "deepseek-io" : "deepseek"}"`}</span>
                      );
                      {selectedEndpoint === "top4top" ? (
                        <>
                          curl_setopt(<span className="text-blue-300">$ch</span>, CURLOPT_POSTFIELDS, [
                          <br />  <span className="text-amber-300">{"'file'"}</span> {"=>"} <span className="text-purple-400">new</span> <span className="text-blue-400">CURLFile</span>(<span className="text-amber-300">{"'/path/to/img.png'"}</span>)
                          <br />]);
                        </>
                      ) : (
                        <>
                          curl_setopt(<span className="text-blue-300">$ch</span>,
                          CURLOPT, [
                          <span className="text-amber-300">
                            {"'Content-Type: application/json'"}
                          </span>
                          ]); curl_setopt(<span className="text-blue-300">$ch</span>
                          , CURLOPT_POSTFIELDS, json_encode(
                          {selectedEndpoint === "vision"
                            ? `["prompt" => "Analysis", "imageUrl" => "https://img.com/p.jpg"]`
                            : selectedEndpoint === "deepseek-sl"
                              ? `["prompt" => "Apa itu AI?", "model" => "v32"]`
                              : selectedEndpoint === "raphael"
                                ? `["prompt" => "A cute cat"]`
                                : selectedEndpoint === "ytdownloader"
                                  ? `["url" => "https://youtu.be/...", "type" => "audio"]`
                                  : selectedEndpoint === "overchat" ||
                                    selectedEndpoint === "gpt5"
                                ? `["messages" => [["role" => "user", "content" => "Hello"]]]`
                                : selectedEndpoint === "perplexity"
                                  ? `["q" => "Apa itu Metaverse?"]`
                                  : selectedEndpoint === "perplexity-2"
                                    ? `["q" => "AI Pro", "mode" => "copilot", "model" => "turbo"]`
                                  : selectedEndpoint === "deepseek-io"
                                    ? `["prompt" => "Halo DeepSeek"]`
                                : `["prompt" => "Hello"]`}
                          ));
                        </>
                      )} curl_setopt(<span className="text-blue-300">$ch</span>
                      , CURLOPT_WRITEFUNCTION,{" "}
                      <span className="text-purple-400">function</span>(
                      <span className="text-blue-300">$ch</span>,{" "}
                      <span className="text-blue-300">$data</span>) {"{"}
                      <span className="text-purple-400">echo</span>{" "}
                      <span className="text-blue-300">$data</span>;{" "}
                      <span className="text-purple-400">return</span> strlen(
                      <span className="text-blue-300">$data</span>);
                      {"}"}); curl_exec(
                      <span className="text-blue-300">$ch</span>);
                    </pre>
                  </div>
                </div>

                {/* Go */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-slate-700">
                      Go (Native)
                    </span>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg border border-slate-800 overflow-hidden shadow-sm">
                    <pre className="p-3 text-slate-300 font-mono text-[9px] overflow-x-auto leading-relaxed">
                      <span className="text-purple-400">import</span> ({" "}
                      <span className="text-amber-300">{'"bytes"'}</span>;{" "}
                      <span className="text-amber-300">{'"io"'}</span>;{" "}
                      <span className="text-amber-300">{'"net/http"'}</span>;{" "}
                      <span className="text-amber-300">{'"os"'}</span> )
                      <span className="text-blue-400">func</span>{" "}
                      <span className="text-blue-400">main</span>() {"{"}
                      url :={" "}
                      <span className="text-amber-300">{`"${baseUrl}/api/${selectedEndpoint === "overchat" ? "overchat" : selectedEndpoint === "gemini" ? "gemini" : selectedEndpoint === "gpt5" ? "gpt5" : selectedEndpoint === "vision" ? "vision" : selectedEndpoint === "deepseek-sl" ? "deepseek-sl" : selectedEndpoint === "raphael" ? "ai/raphael" : selectedEndpoint === "ytdownloader" ? "downloader/youtube" : selectedEndpoint === "top4top" ? "uploader/top4top" : selectedEndpoint === "perplexity" ? "perplexity" : selectedEndpoint === "perplexity-2" ? "perplexity-2" : selectedEndpoint === "deepseek-io" ? "deepseek-io" : "deepseek"}"`}</span>
                      {selectedEndpoint === "top4top" ? (
                        <>
                          <br />
                          <span className="text-slate-500">{"// use multipart writer to upload file"}</span>
                          <br />
                          body := &amp;bytes.Buffer{"{}"}
                        </>
                      ) : (
                        <>
                          jsonStr := []byte(
                          {selectedEndpoint === "vision"
                            ? `"{\\"prompt\\":\\"Analysis\\",\\"imageUrl\\":\\"https://img.com/p.jpg\\"}"`
                            : selectedEndpoint === "deepseek-sl"
                              ? `"{\\"prompt\\":\\"Hey!\\",\\"model\\":\\"chat31\\"}"`
                              : selectedEndpoint === "raphael"
                                ? `"{\\"prompt\\":\\"A realistic mountain landscape\\"}"`
                                : selectedEndpoint === "ytdownloader"
                                  ? `"{\\"url\\":\\"https://youtu.be/...\\",\\"type\\":\\"audio\\"}"`
                                  : selectedEndpoint === "overchat" ||
                                    selectedEndpoint === "gpt5"
                                ? `"{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"Hello\\"}]}"`
                                : selectedEndpoint === "perplexity"
                                  ? `"{\\"q\\":\\"Apa itu Metaverse?\\"}"`
                                  : selectedEndpoint === "perplexity-2"
                                    ? `"{\\"q\\":\\"AI Pro\\",\\"mode\\":\\"copilot\\",\\"model\\":\\"turbo\\"}"`
                                  : selectedEndpoint === "deepseek-io"
                                    ? `"{\\"prompt\\":\\"Halo DeepSeek\\"}"`
                                : `"{\\"prompt\\":\\"Hello\\"}"`}
                          )
                        </>
                      )}
                      <br /> req, _ := http.
                      <span className="text-blue-400">NewRequest</span>(
                      <span className="text-amber-300">{'"POST"'}</span>, url,
                      {selectedEndpoint === "top4top" ? "body" : "bytes.NewBuffer(jsonStr)"}) 
                      {selectedEndpoint !== "top4top" && (
                        <>
                          <br /> req.Header.
                          <span className="text-blue-400">Set</span>(
                          <span className="text-amber-300">{'"Content-Type"'}</span>
                          ,{" "}
                          <span className="text-amber-300">
                            {'"application/json"'}
                          </span>
                          )
                        </>
                      )} client := &amp;http.Client{"{"}
                      {"}"}
                      resp, _ := client.
                      <span className="text-blue-400">Do</span>(req)
                      <span className="text-purple-400">defer</span>{" "}
                      resp.Body.Close() io.
                      <span className="text-blue-400">Copy</span>(os.Stdout,
                      resp.Body)
                      {"}"}
                    </pre>
                  </div>
                </div>

                {selectedEndpoint === "ytdownloader" && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-tighter">
                        Node.js (Advanced / Multi-Step Logic)
                      </span>
                    </div>
                    <div className="bg-[#0a0f1c] rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
                      <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-[8px] font-mono text-slate-500">ytdown.js</span>
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                        </div>
                      </div>
                      <pre className="p-4 text-slate-400 font-mono text-[8px] overflow-x-auto leading-relaxed max-h-[300px] custom-scrollbar">
                        <span className="text-emerald-500">{"// total script integration for production"}</span>
                        <br />
                        <span className="text-purple-400">async function</span> <span className="text-blue-400">tunexaDown</span>(url, options = {"{}"}) {"{"}
                        <br />  <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-amber-300">{`"${baseUrl}/api/downloader/youtube"`}</span>, {"{"}
                        <br />    method: <span className="text-amber-300">{"'POST'"}</span>,
                        <br />    headers: {"{"} <span className="text-amber-300">{"'Content-Type'"}</span>: <span className="text-amber-300">{"'application/json'"}</span> {"}"},
                        <br />    body: <span className="text-blue-400">JSON</span>.<span className="text-blue-400">stringify</span>({"{"} url, type: options.download_type || <span className="text-amber-300">{"'audio'"}</span> {"}"})
                        <br />  {"}"});
                        <br />  <span className="text-purple-400">return await</span> res.<span className="text-blue-400">json</span>();
                        <br />{"}"}
                        <br /><br />
                        <span className="text-slate-500">{"// Usage example with progress log simulation"}</span>
                        <br />
                        <span className="text-blue-400">tunexaDown</span>(<span className="text-amber-300">{"'https://youtu.be/...'"}</span>)
                        <br />  .<span className="text-blue-400">then</span>(data {"=>"} <span className="text-blue-400">console</span>.<span className="text-blue-400">log</span>(data))
                        <br />  .<span className="text-blue-400">catch</span>(err {"=>"} <span className="text-blue-400">console</span>.<span className="text-blue-400">error</span>(err));
                      </pre>
                    </div>
                  </div>
                )}

                {selectedEndpoint === "top4top" && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-tighter">
                        Node.js (Multipart/Form-Data Implementation)
                      </span>
                    </div>
                    <div className="bg-[#0a0f1c] rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
                      <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-[8px] font-mono text-slate-500">upload.js</span>
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                        </div>
                      </div>
                      <pre className="p-4 text-slate-400 font-mono text-[8px] overflow-x-auto leading-relaxed max-h-[300px] custom-scrollbar">
                        <span className="text-purple-400">const</span> FormData = <span className="text-blue-400">require</span>(<span className="text-amber-300">{"'form-data'"}</span>);
                        <br />
                        <span className="text-purple-400">const</span> fs = <span className="text-blue-400">require</span>(<span className="text-amber-300">{"'fs'"}</span>);
                        <br />
                        <span className="text-purple-400">const</span> axios = <span className="text-blue-400">require</span>(<span className="text-amber-300">{"'axios'"}</span>);
                        <br /><br />
                        <span className="text-purple-400">async function</span> <span className="text-blue-400">uploadToCloud</span>(filePath) {"{"}
                        <br />  <span className="text-purple-400">const</span> form = <span className="text-purple-400">new</span> <span className="text-blue-400">FormData</span>();
                        <br />  form.<span className="text-blue-400">append</span>(<span className="text-amber-300">{"'file'"}</span>, fs.<span className="text-blue-400">createReadStream</span>(filePath));
                        <br /><br />  <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> axios.<span className="text-blue-400">post</span>(<span className="text-amber-300">{`"${baseUrl}/api/uploader/top4top"`}</span>, form, {"{"}
                        <br />    headers: form.<span className="text-blue-400">getHeaders</span>()
                        <br />  {"}"});
                        <br />  <span className="text-purple-400">return</span> res.data;
                        <br />{"}"}
                        <br /><br />
                        <span className="text-blue-400">uploadToCloud</span>(<span className="text-amber-300">{"'./my-photo.jpg'"}</span>)
                        <br />  .<span className="text-blue-400">then</span>(res {"=>"} <span className="text-blue-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-amber-300">{"\"Link:\""}</span>, res.Result_url))
                        <br />  .<span className="text-blue-400">catch</span>(err {"=>"} <span className="text-blue-400">console</span>.<span className="text-blue-400">error</span>(err));
                      </pre>
                    </div>
                  </div>
                )}

                {/* Expected Response Details */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{" "}
                    Hasil Yang Didapatkan (Response)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-gray-200 rounded-lg p-3">
                      <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">
                        HTTP Headers
                      </span>
                      <div className="space-y-1 font-mono text-[9px] text-slate-600 font-bold">
                        <div>
                          <span className="text-blue-500">HTTP/1.1</span> 200 OK
                        </div>
                        <div>
                          <span className="text-blue-500">Content-Type:</span>{" "}
                          {selectedEndpoint === "raphael" || selectedEndpoint === "top4top" || selectedEndpoint === "ytdownloader" || selectedEndpoint === "perplexity" || selectedEndpoint === "perplexity-2"
                            ? "application/json"
                            : "text/event-stream"}
                        </div>
                        <div>
                          <span className="text-blue-500">
                            X-Stenly-Engine:
                          </span>{" "}
                          {selectedEndpoint === "overchat"
                            ? "Claude-3.5-Haiku-Node"
                            : selectedEndpoint === "gemini"
                              ? "Gemini-3.1-Flash-Lite"
                              : selectedEndpoint === "gpt5"
                                ? "GPT-5-Nano-Bridge"
                                : selectedEndpoint === "vision"
                                  ? "GPT-4o-Mini-Vision"
                                  : selectedEndpoint === "deepseek-sl"
                                    ? "DeepSeek-3in1-SL"
                                    : selectedEndpoint === "raphael"
                                      ? "Raphael-Art-AI"
                                        : selectedEndpoint === "ytdownloader"
                                          ? "YouTube-Downloader-V1"
                                          : selectedEndpoint === "top4top"
                                            ? "Top4Top-Uploader-V1"
                                          : selectedEndpoint === "perplexity-2"
                                            ? "Perplexity-Pro-V3"
                                          : selectedEndpoint === "perplexity"
                                            ? "Perplexity-Search-Engine"
                                            : "DeepSeek-V4-Core"}
                        </div>
                        {(selectedEndpoint === "overchat" ||
                          selectedEndpoint === "gpt5" ||
                          selectedEndpoint === "ytdownloader") && (
                          <div>
                            <span className="text-blue-500">X-Chat-ID:</span>{" "}
                            ssn_...
                          </div>
                        )}
                      </div>
                    </div>

                      <div className="bg-[#0a0f1c] border border-slate-800 rounded-lg p-3">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">
                          {selectedEndpoint === "raphael" || selectedEndpoint === "top4top" || selectedEndpoint === "ytdownloader" || selectedEndpoint === "perplexity" || selectedEndpoint === "perplexity-2"
                            ? "JSON Response"
                            : "Stream Output"}
                        </span>
                        <div className="font-mono text-[9px] leading-relaxed">
                          {selectedEndpoint === "raphael" ? (
                            <JsonHighlighter
                              data={{
                                status: true,
                                creator: "Stenly",
                                results: [{ no: 1, url: "...", seed: 123 }],
                              }}
                            />
                          ) : selectedEndpoint === "top4top" ? (
                            <JsonHighlighter
                              data={{
                                Status: true,
                                Code: 200,
                                Input: "file.mp3",
                                Result_url: "https://f.top4top.io/f_...",
                              }}
                            />
                          ) : selectedEndpoint === "perplexity-2" ? (
                            <JsonHighlighter
                              data={{
                                status: true,
                                creator: "Stenly",
                                result: {
                                  query: "Apa itu Metaverse?",
                                  mode: "copilot",
                                  model: "turbo",
                                  focus: "internet",
                                  answer: "Metaverse adalah visi masa depan internet yang berupa dunia virtual 3D yang imersif dan saling terhubung...",
                                  sources: [
                                    { title: "Metaverse - Wikipedia", url: "https://id.wikipedia.org/wiki/Metaverse", domain: "wikipedia.org" },
                                    { title: "Definisi Metaverse - Kompas", url: "https://tekno.kompas.com/read/...", domain: "kompas.com" }
                                  ],
                                  media: [
                                    { title: "Metaverse Illustration", url: "https://images.perplexity.ai/..." }
                                  ],
                                  related: [
                                    "Siapa penemu istilah Metaverse?",
                                    "Kapan Metaverse akan terealisasi sepenuhnya?",
                                    "Apa hubungan NFT dengan Metaverse?"
                                  ],
                                  threadId: "6be79e39-bc7d-464d-abaf-4be7f2165e6",
                                  threadUrl: "https://www.perplexity.ai/search/6be79e39-bc7d-464d-abaf-4be7f2165e6",
                                  extraSources: [
                                    { title: "Facebook Rebrands to Meta", url: "https://about.fb.com/news/...", snippet: "Metaverse is the next evolution of social connection..." }
                                  ]
                                },
                                _latencyMs: 1240
                              }}
                            />
                          ) : selectedEndpoint === "perplexity" ? (
                            <JsonHighlighter
                              data={{
                                status: true,
                                creator: "Stenly",
                                result: {
                                  answer: "...",
                                  sources: ["..."],
                                  related: ["..."],
                                },
                              }}
                            />
                          ) : selectedEndpoint === "ytdownloader" ? (
                            <JsonHighlighter
                              data={{
                                status: true,
                                creator: "Stenly",
                                title: "Video Title",
                                duration: "03:45",
                                download_url: "https://cdn.link/...",
                                format: "mp3",
                                quality: "320K",
                              }}
                            />
                          ) : (
                            <span className="text-emerald-400 font-bold whitespace-pre-wrap">
                              {`Halo!\nAda\nyang\nbisa\nsaya bantu?`}
                            </span>
                          )}
                        </div>
                      </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-[9px] font-bold text-blue-800 leading-relaxed italic">
                      * Catatan:{" "}
                      {selectedEndpoint === "raphael"
                        ? "Response dikirimkan dalam format JSON lengkap berisi array URL gambar hasil generasi."
                      : selectedEndpoint === "top4top"
                        ? "File diunggah langsung ke server Top4Top. Response berisi tautan langsung yang diparsing dari HTML sukses server asal."
                        : "Data dikirimkan secara parsial melalui chunked transfer encoding. Gunakan parser SSE atau pembaca stream mentah di aplikasi Anda untuk menangani output realtime."}
                    </p>
                  </div>
                  {/* Troubleshooting Section - ONLY FOR DEEPSEEK-IO */}
                  {selectedEndpoint === "deepseek-io" && (
                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-[10px] font-extrabold text-slate-800 mb-3 flex items-center gap-1.5 italic">
                         <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Troubleshooting & FAQ: DeepSeek Type-IO
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-amber-50/50 border border-amber-100 rounded-md p-3">
                          <div className="text-[9px] font-bold text-amber-800 mb-1">HTTP 403 Forbidden / CSRF Error</div>
                          <p className="text-[8px] text-amber-700 leading-relaxed">
                            Jika Anda mendapatkan error 403, hal ini biasanya disebabkan oleh deteksi WAF (Web Application Firewall) pada host <code className="bg-amber-100 px-1">deep-seek.ai</code>.
                            <br />• <strong>Type-IO Engine</strong>: Sistem kami menggunakan rotasi CSRF token dinamis. Jika gagal, sistem akan mencoba mengambil ulang token secara otomatis.
                            <br />• <strong>Solusi</strong>: Jika error berlanjut selama lebih dari 60 detik, gunakan endpoint <code className="bg-amber-100 px-1">deepseek-sl</code> sebagai fallback yang lebih stabil.
                          </p>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-100 rounded-md p-3">
                          <div className="text-[9px] font-bold text-blue-800 mb-1">Kenapa respon sangat cepat?</div>
                          <p className="text-[8px] text-blue-700 leading-relaxed">
                            Engine Type-IO-Scraper dioptimalkan untuk meminimalkan overhead dengan melewatkan render engine pada server target dan langsung berinteraksi dengan stream data JSON mentah.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* API Playground Terminal style */}
          <div className="w-full xl:w-[340px] shrink-0 bg-[#0a0f1c] rounded-lg shadow-2xl border border-slate-800/80 flex flex-col h-[480px] overflow-hidden">
            {/* Debian Terminal Header */}
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-800/80 bg-[#111827]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/90 border border-red-500/20"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/90 border border-amber-500/20"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/90 border border-emerald-500/20"></div>
              </div>
              <div className="text-[7px] font-mono text-slate-400 font-bold flex items-center gap-1.5 ml-6">
                <Terminal className="w-2.5 h-2.5 text-slate-500" /> tty1 - bash
              </div>
              <div className="w-8"></div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 bg-[#0c111d]">
              {/* Terminal Tabs */}
              <div className="flex border-b border-slate-800/80 bg-[#111827]/50">
                <button
                  onClick={() => setActiveTab("request")}
                  className={`px-3 py-1.5 font-mono text-[8px] font-extrabold tracking-widest transition-colors border-r border-slate-800/80 uppercase ${activeTab === "request" ? "bg-[#0c111d] text-emerald-400" : "text-slate-500 hover:bg-[#1f2937]"}`}
                >
                  Payload.json
                </button>
                <button
                  onClick={() => setActiveTab("response")}
                  className={`px-3 py-1.5 font-mono text-[8px] font-extrabold tracking-widest transition-colors uppercase ${activeTab === "response" ? "bg-[#0c111d] text-emerald-400" : "text-slate-500 hover:bg-[#1f2937]"}`}
                >
                  Response.log
                </button>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-3 overflow-y-auto font-mono text-[10px] text-slate-300 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-track]:bg-transparent leading-relaxed">
                {activeTab === "request" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase">
                        {selectedEndpoint === "ytdownloader" ? "# YouTube Video URL" : "# User Input Message"}
                      </div>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-16 bg-[#111827] border border-slate-700/50 rounded p-2 focus:border-emerald-500/50 outline-none text-emerald-400 resize-none shadow-inner leading-relaxed text-[10px]"
                        placeholder={selectedEndpoint === "ytdownloader" ? "https://www.youtube.com/watch?v=..." : "Ketikan prompt sistem asisten disini..."}
                      />
                    </div>
                    {selectedEndpoint === "ytdownloader" && (
                      <div>
                        <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase">
                          # Select Media Type
                        </div>
                        <div className="flex gap-2">
                          {(["audio", "video"] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => setYtdlType(t)}
                              className={`flex-1 py-1 text-[8px] font-bold rounded border transition-all ${ytdlType === t ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.05)]" : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700"}`}
                            >
                              {t === "audio" ? "MP3 / Audio" : "MP4 / Video"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedEndpoint === "top4top" && (
                      <div className="space-y-3">
                        <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase flex items-center justify-between">
                          <span># File Binary Input</span>
                          {selectedFile && <span className="text-cyan-500 lowercase">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>}
                        </div>
                        <label className="flex flex-col items-center justify-center w-full h-16 border border-slate-700/50 rounded-lg cursor-pointer bg-[#111827] hover:bg-[#1f2937] transition-all border-cyan-500/10 hover:border-cyan-500/30">
                          <div className="flex items-center gap-3 px-3">
                            <FileIcon className={`w-4 h-4 ${selectedFile ? "text-cyan-400" : "text-slate-500 opacity-50"}`} />
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-slate-300">
                                {selectedFile ? selectedFile.name : "Select host file..."}
                              </span>
                              {!selectedFile && <span className="text-[7px] text-slate-600 uppercase tracking-widest font-extrabold">Multipart/Form-Data</span>}
                            </div>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setSelectedFile(file);
                            }}
                          />
                        </label>
                      </div>
                    )}
                    {selectedEndpoint === "vision" && (
                      <div>
                        <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase">
                          # Attachment Image URL
                        </div>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full bg-[#111827] border border-slate-700/50 rounded p-2 focus:border-indigo-500/50 outline-none text-indigo-400 shadow-inner text-[10px]"
                          placeholder="https://akcdn.detik.net.id/community/media/..."
                        />
                      </div>
                    )}
                    {selectedEndpoint === "deepseek-sl" && (
                      <div>
                        <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase">
                          # Select Thinking Model
                        </div>
                        <div className="flex gap-2">
                          {(["chat31", "r1", "v32"] as const).map((m) => (
                            <button
                              key={m}
                              onClick={() => setSelectedModel(m)}
                              className={`flex-1 py-1 text-[8px] font-bold rounded border ${selectedModel === m ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}
                            >
                              {m === "r1"
                                ? "R1 (Thinking)"
                                : m === "chat31"
                                  ? "Chat 3.1"
                                  : "V3.2 (Stable)"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-slate-500 mb-1.5 font-extrabold tracking-widest text-[7px] uppercase">
                        # Prepared JSON Request
                      </div>
                      <div className="bg-[#111827] p-2.5 rounded border border-slate-700/50 shadow-inner">
                        <JsonHighlighter
                          data={
                            selectedEndpoint === "vision"
                              ? { prompt, imageUrl }
                              : selectedEndpoint === "deepseek-sl"
                                ? { prompt, model: selectedModel }
                                : selectedEndpoint === "raphael"
                                  ? { prompt }
                                  : selectedEndpoint === "ytdownloader"
                                    ? { url: prompt, type: ytdlType }
                                    : selectedEndpoint === "deepseek" ||
                                        selectedEndpoint === "gemini"
                                      ? { prompt }
                                      : {
                                          messages: [
                                            { role: "user", content: prompt },
                                          ],
                                        }
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    {response ? (
                      <div
                        className={
                          response.status === "error"
                            ? "text-red-400"
                            : "text-emerald-400 whitespace-pre-wrap leading-relaxed inline"
                        }
                      >
                        {selectedEndpoint === "perplexity-2" && response.status === true ? (
                          <div className="space-y-4">
                            <span className="text-slate-500 select-none mr-1.5">
                              {"root@stenly:~#"}
                            </span>
                            <div className="text-emerald-400 font-bold mb-2 inline-block tracking-tight text-[11px]">
                              Research Synthesis:{" "}
                              <span className="text-white italic underline decoration-blue-500/30">
                                {"\""}{response.result.query}{"\""}
                              </span>
                            </div>

                            <div className="space-y-0.5 mb-4 border-l border-slate-800 pl-3">
                               <div className="text-[8px] text-slate-500 font-bold flex items-center gap-2">
                                  <span className="text-blue-500/50">⚡</span> Initializing Perplexity Labs context...
                               </div>
                               <div className="text-[8px] text-slate-500 font-bold flex items-center gap-2">
                                  <span className="text-blue-500/50">⚡</span> Aggregating sources from {response.result.focus}...
                               </div>
                               <div className="text-[9px] text-emerald-400 font-bold flex items-center gap-2">
                                  <span className="text-emerald-500">✓</span> OK: Research data synthesized.
                               </div>
                            </div>
                            
                            <div className="text-[10px] leading-relaxed text-slate-300 border-l border-blue-500/20 pl-3 mb-4 whitespace-pre-wrap selection:bg-blue-500/30">
                               {response.result.answer}
                            </div>

                            {/* Response JSON Log Section */}
                            <div className="mt-4 pt-4 border-t border-slate-800/50">
                               <div className="text-[7px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                  STDOUT: RESPONSE_JSON_LOG
                               </div>
                               <div className="bg-[#080c14] p-2 rounded border border-slate-800/50 shadow-inner overflow-x-auto">
                                  <JsonHighlighter data={response} />
                               </div>
                            </div>

                            {response.result.sources && response.result.sources.length > 0 && (
                              <div className="space-y-2 mt-4">
                                <div className="text-[8px] font-extrabold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                                   <Globe className="w-2.5 h-2.5" /> Primary Sources
                                </div>
                                <div className="grid grid-cols-1 gap-1.5">
                                   {response.result.sources.map((s: any, idx: number) => (
                                     <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="block bg-[#111827] border border-slate-800 p-2 rounded hover:border-blue-500/30 transition-colors group">
                                        <div className="text-[9px] font-bold text-slate-200 group-hover:text-blue-400 truncate">{s.title}</div>
                                        <div className="text-[7px] text-slate-500 truncate">{s.url}</div>
                                     </a>
                                   ))}
                                </div>
                              </div>
                            )}

                            {response.result.media && response.result.media.length > 0 && (
                              <div className="space-y-2">
                                <div className="text-[8px] font-extrabold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                   <ImageIcon className="w-2.5 h-2.5" /> Discovery Media
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                   {response.result.media.map((m: any, idx: number) => (
                                     <div key={idx} className="shrink-0 w-24 aspect-video rounded border border-slate-800 overflow-hidden relative group">
                                        <Image 
                                          src={m.url} 
                                          alt={m.title || "Media"} 
                                          width={100} 
                                          height={60} 
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                           <div className="text-[6px] text-center text-white line-clamp-2">{m.title}</div>
                                        </div>
                                     </div>
                                   ))}
                                </div>
                              </div>
                            )}

                            {response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block uppercase">
                                &gt;&gt; RESEARCH_VOYAGE_COMPLETED IN{" "}
                                {response._latencyMs}MS
                              </div>
                            )}
                          </div>
                        ) : selectedEndpoint === "ytdownloader" && response.status === true ? (
                          <div className="space-y-4">
                            <span className="text-slate-500 select-none mr-1.5">
                              {"root@stenly:~#"}
                            </span>
                            {response.logs && (
                              <div className="space-y-0.5 mb-4 border-l border-slate-800 pl-3">
                                {response.logs.map((log: string, idx: number) => (
                                  <div key={idx} className="text-[9px] text-slate-500 font-bold flex items-center gap-2">
                                    <span className="text-emerald-500/50">⚡</span> {log}
                                  </div>
                                ))}
                                <div className="text-[9px] text-emerald-400 font-bold flex items-center gap-2">
                                  <span className="text-emerald-500">✓</span> OK: Data package received.
                                </div>
                              </div>
                            )}
                            <span className="text-red-400 font-bold mb-2 inline-block tracking-tight text-[11px]">
                              YouTube Media Found:{" "}
                              <span className="text-white">
                                {response.title}
                              </span>
                            </span>
                            <div className="rounded-md overflow-hidden border border-slate-700 bg-slate-900 shadow-lg max-w-sm">
                              <Image
                                src={response.thumbnail}
                                alt={response.title}
                                width={400}
                                height={225}
                                className="w-full h-auto"
                                referrerPolicy="no-referrer"
                              />
                              <div className="p-3 bg-black/50 backdrop-blur-sm border-t border-slate-700/50 space-y-2">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400">Duration:</span>
                                  <span className="text-white font-bold">{response.duration}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400">Format/Quality:</span>
                                  <span className="text-emerald-400 font-bold">{response.format} / {response.quality}</span>
                                </div>
                                <a 
                                  href={response.download_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="block w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded transition-colors uppercase tracking-widest mt-2"
                                >
                                  Download Media
                                </a>
                              </div>
                            </div>

                            {/* Response JSON Log Section */}
                            <div className="mt-4 pt-4 border-t border-slate-800/50">
                               <div className="text-[7px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                  STDOUT: RESPONSE_JSON_LOG
                               </div>
                               <div className="bg-[#080c14] p-2 rounded border border-slate-800/50 shadow-inner overflow-x-auto">
                                  <JsonHighlighter data={response} />
                               </div>
                            </div>

                            {response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block uppercase">
                                &gt;&gt; DOWNLOAD_LINK_READY IN{" "}
                                {response._latencyMs}MS
                              </div>
                            )}
                          </div>
                        ) : selectedEndpoint === "top4top" && response.Status ? (
                          <div className="space-y-4">
                            <span className="text-slate-500 select-none mr-1.5">
                              {"root@stenly:~#"}
                            </span>
                            <span className="text-cyan-400 font-bold mb-2 inline-block tracking-tight text-[11px]">
                              Cloud Upload Successful:{" "}
                              <span className="text-white">
                                {response.Input}
                              </span>
                            </span>
                            <div className="rounded-md overflow-hidden border border-slate-700 bg-slate-900 shadow-lg max-w-sm p-4 space-y-3">
                               <div className="flex items-center gap-3">
                                  <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20 text-cyan-400">
                                     <Zap className="w-4 h-4" />
                                  </div>
                                  <div>
                                     <div className="text-[10px] font-extrabold text-white">Direct URL Generated</div>
                                     <div className="text-[8px] text-slate-500 font-bold tracking-tight">Status: {response.Code} OK</div>
                                  </div>
                               </div>
                               <div className="bg-black/40 rounded p-2.5 font-mono text-[9px] text-emerald-400 break-all select-all scrollbar-hide overflow-x-auto">
                                  {response.Result_url}
                               </div>
                               <a 
                                 href={response.Result_url} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="block w-full text-center py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-[10px] rounded transition-colors uppercase tracking-widest shadow-lg shadow-cyan-900/20"
                               >
                                 Open Direct Link
                               </a>
                            </div>
                            {response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block uppercase">
                                &gt;&gt; CLOUD_PERSISTENCE_READY IN{" "}
                                {response._latencyMs}MS
                              </div>
                            )}
                          </div>
                        ) : selectedEndpoint === "raphael" && response.results ? (
                          <div className="space-y-4">
                            <span className="text-slate-500 select-none mr-1.5">
                              {"root@stenly:~#"}
                            </span>
                            <span className="text-emerald-400 font-bold mb-2 inline-block tracking-tight text-[11px]">
                              Generating digital canvas for:{" "}
                              <span className="text-rose-400 italic">
                              {"\""}{response.prompt}{"\""}
                            </span>
                            </span>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {response.results.map((res: any) => (
                                <div
                                  key={res.no}
                                  className="aspect-square relative rounded-md overflow-hidden border border-slate-700 bg-slate-900 group shadow-lg"
                                >
                                  <Image
                                    src={res.url}
                                    alt={`Raphael Output ${res.no}`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-x-0 bottom-0 bg-black/70 p-1.5 text-[7px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border-t border-slate-700/50">
                                    <div className="flex justify-between items-center">
                                      <span>
                                        RES: {res.width || "1024"}x
                                        {res.height || "1024"}
                                      </span>
                                      <span>ID: {res.seed || "#" + res.no}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block uppercase">
                                &gt;&gt; PROCESS_COMPLETED_IMAGE_SYNC IN{" "}
                                {response._latencyMs}MS
                              </div>
                            )}
                          </div>
                        ) : typeof response.answer === "string" ? (
                          <span>
                            <span className="text-slate-500 select-none mr-1.5">
                              {"root@stenly:~#"}
                            </span>
                            {response.answer}
                            {isLoading && (
                              <span className="animate-pulse font-black text-emerald-400 ml-1">
                                _
                              </span>
                            )}
                            {!isLoading && response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block">
                                [PROCESS COMPLETED COMPUTE IN{" "}
                                {response._latencyMs}MS]
                              </div>
                            )}
                          </span>
                        ) : (
                          <div className="space-y-2">
                             <div className="text-slate-500 select-none text-[8px] font-bold">root@stenly:~# cat response.json</div>
                             <JsonHighlighter data={response} />
                             {!isLoading && response._latencyMs && (
                              <div className="mt-4 text-slate-500 font-extrabold text-[7px] tracking-widest block">
                                [PROCESS COMPLETED COMPUTE IN{" "}
                                {response._latencyMs}MS]
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 select-none">root@stenly:~#</span>
                          {isLoading ? (
                            <span className="text-emerald-400 animate-pulse font-bold tracking-tighter uppercase text-[9px]">
                              {selectedEndpoint === "ytdownloader" ? "TUNEXA_SCRAPER_ENGAGED..." : selectedEndpoint === "top4top" ? "UPLOADING_TO_CLOUD..." : "EXECUTING_JOB..."}
                            </span>
                          ) : (
                            <span className="text-slate-600 italic">waiting for command...</span>
                          )}
                        </div>
                        
                        {isLoading && selectedEndpoint === "top4top" && (
                           <div className="mt-4 space-y-3">
                              <div className="space-y-1.5 border-l border-cyan-500/30 pl-3">
                                 <div className="text-[9px] text-cyan-400 font-bold flex items-center gap-2 animate-pulse">
                                   <span className="animate-spin text-[8px] text-cyan-500">☁</span> Connecting to Top4Top Secure Node...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-cyan-600">→</span> Establishing session cookie (sid)...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-cyan-600">→</span> Buffering binary data stream...
                                 </div>
                                 
                                 <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-3">
                                    <motion.div 
                                      initial={{ width: "2%" }}
                                      animate={{ width: "98%" }}
                                      transition={{ duration: 8, ease: "linear" }}
                                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                    />
                                 </div>
                                 <div className="text-[7px] text-cyan-600 font-extrabold tracking-[0.2em] uppercase mt-1">
                                   Finalizing upload at index.php...
                                 </div>
                              </div>
                           </div>
                        )}
                        
                        {isLoading && selectedEndpoint === "perplexity-2" && (
                           <div className="mt-4 space-y-3">
                              <div className="space-y-1.5 border-l border-blue-500/30 pl-3">
                                 <div className="text-[9px] text-blue-400 font-bold flex items-center gap-2 animate-pulse">
                                   <span className="animate-spin text-[8px] text-blue-500">⚛</span> Initialising Deep Research node...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-blue-600">→</span> Bypassing session constraints...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-blue-600">→</span> Scanning {ytdlType === "video" ? "network" : "search focus"} clusters...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-blue-600">→</span> Aggregating citations & media...
                                 </div>
                                 
                                 <div className="h-0.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-3">
                                    <motion.div 
                                      initial={{ width: "0%" }}
                                      animate={{ width: "95%" }}
                                      transition={{ duration: 15, ease: "linear" }}
                                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                                    />
                                 </div>
                                 <div className="text-[7px] text-blue-600 font-extrabold tracking-[0.2em] uppercase mt-1">
                                   Synthesizing response via Perplexity Labs...
                                 </div>
                              </div>
                           </div>
                        )}
                        
                        {isLoading && selectedEndpoint === "ytdownloader" && (
                           <div className="mt-4 space-y-3">
                              <div className="space-y-1.5 border-l border-red-500/30 pl-3">
                                 <div className="text-[9px] text-red-400 font-bold flex items-center gap-2 animate-pulse">
                                   <span className="animate-spin text-[8px] text-red-500">⚙</span> Scraping id.tunexa.io infrastructure...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-red-600">→</span> bypass_cf_v2: turning turnstile...
                                 </div>
                                 <div className="text-[8px] text-slate-500/80 font-bold flex items-center gap-2">
                                   <span className="text-red-600">→</span> media_engine: extract_{ytdlType === 'audio' ? 'mp3_320k' : 'video_hd'}...
                                 </div>
                                 
                                 <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-3">
                                    <motion.div 
                                      initial={{ width: "2%" }}
                                      animate={{ width: "95%" }}
                                      transition={{ duration: 15, ease: "linear" }}
                                      className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                                    />
                                 </div>
                                 <div className="text-[7px] text-slate-600 font-extrabold tracking-[0.2em] uppercase mt-1">
                                   Receiving remote buffer fragments...
                                 </div>
                              </div>
                           </div>
                        )}
                        
                        {!isLoading && (
                          <span className="text-slate-800 animate-pulse mt-1">
                            _
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terminal Action Input */}
              <div className="p-3 border-t border-slate-800/80 bg-[#111827]">
                <button
                  onClick={handleTest}
                  disabled={isLoading || (selectedEndpoint === "top4top" ? !selectedFile : !prompt.trim())}
                  className="w-full relative flex items-center justify-center gap-1.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-30 border border-emerald-500/30 text-emerald-400 rounded-md font-mono text-[9px] font-extrabold tracking-wider transition-all disabled:cursor-not-allowed group shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" /> ESTABLISHING
                      STREAM...
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />{" "}
                      {selectedEndpoint === "ytdownloader" ? "./RUN_YT_DOWNLOAD.sh" : selectedEndpoint === "top4top" ? "./UPLOAD_TO_TOP4TOP.sh" : "./EXECUTE_API_CALL.sh"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
