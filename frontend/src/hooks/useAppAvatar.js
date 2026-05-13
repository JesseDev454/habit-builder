import useAuth from "./useAuth";

export const HABITQUEST_AVATAR_FALLBACK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4ugk_G95eEwaEV4_8BP66NZr0cuvImbDtpF1OBcItmX3O3UkQjNh6SUgjHUpFBxnpf1w9KWJ32oDMSnCni393Jf9Ys6BPk5BfZSjB2TAoszINNHpa_9R_dPv7yUo8k9Q1-Cd4GFlkmVOgUmeOEr8swDlEdVNwwHcaWKY_vgI6ctGnZvrGGLkrSn7NC0SGEt_yhTW2jyAB5qVRscTJGe364ZjY2SEdBk9eJsKYxZXzXe_iOXA_hStcT3_js93oQ78BLp2fe_0zJ2m";

const useAppAvatar = () => {
  const { user } = useAuth();

  return user?.avatar || HABITQUEST_AVATAR_FALLBACK;
};

export default useAppAvatar;
