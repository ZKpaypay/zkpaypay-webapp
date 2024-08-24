export default function LoginPageTitle({ title }: { title: string }) {
  return (
    <div className="mb-12 justify-start">
      <span className="text-2xl font-bold leading-[36px] text-left ">
        {title}
      </span>
    </div>
  );
}
