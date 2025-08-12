"use client"

export default function ErrorContent() {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold text-urgent mb-4">404</h1>
      <h2 className="text-xl font-semibold text-primary mb-2">
        Page Not Found
      </h2>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
