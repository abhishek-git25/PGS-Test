import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ProfileImageUpload({ register }) {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-20 h-20 flex items-center justify-center rounded-lg border border-gray-400 bg-muted/20 hover:bg-muted/30 cursor-pointer transition py-0">
      <CardContent className="flex flex-col items-center justify-center p-0 w-full h-full">
        <label
          htmlFor="profile-upload"
          className="w-full h-full flex items-center justify-center cursor-pointer py-0"
        >
          {image ? (
            <img
              src={image}
              alt="Profile Preview"
              className="w-full h-full object-cover"

            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Upload className="h-8 w-8 mb-2" />

            </div>
          )}
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            // {...register('avatar')}
          />
        </label>
      </CardContent>
    </Card>
  );
}
