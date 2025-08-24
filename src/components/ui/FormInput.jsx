import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function FormInput({
  label = "",
  name = "",
  register,
  errors = {},
  type = "text",
  placeholder = "",
  icon: Icon,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-200">
          {label}
        </Label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
          className={`bg-black/40 border border-gray-700 text-white p-5 ${
            Icon ? "pl-10" : ""
          }`}
        />
      </div>

      {name && errors[name] && (
        <p className="text-red-500 text-xs">{errors[name]?.message}</p>
      )}
    </div>
  );
}
