import { useRouter } from "next/router";

export default function ResutlsPage() {
  const router = useRouter();
  const { search } = router.query;

  return (
    <div>
      <h1>{search}</h1>
    </div>
  );
}
