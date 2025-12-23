import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupData } from "../page";

interface Step2Props {
  formData: SignupData;
  updateFormData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Authentication({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    onNext();
  };

  // Password validation requirements
  const validatePassword = () => {
    const password = formData.password;
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const requirements = validatePassword();
  const fulfilledCount = Object.values(requirements).filter(Boolean).length;
  const totalRequirements = Object.keys(requirements).length;

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    
    const percentage = (fulfilledCount / totalRequirements) * 100;
    
    if (percentage < 40) return { strength: percentage, label: 'Faible', color: 'bg-red-500' };
    if (percentage < 80) return { strength: percentage, label: 'Moyen', color: 'bg-yellow-500' };
    return { strength: percentage, label: 'Fort', color: 'bg-green-500' };
  };

  const strength = passwordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="relative">
          <Icon 
            icon="lucide:mail" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Mot de passe
        </label>
        <div className="relative">
          <Icon 
            icon="lucide:lock" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Créez un mot de passe"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            required
            className="pl-10 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon 
              icon={showPassword ? "lucide:eye-off" : "lucide:eye"} 
              className="w-5 h-5" 
            />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${strength.color}`}
                style={{ width: `${strength.strength}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Force du mot de passe: <span className="font-medium">{strength.label}</span>
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirmer le mot de passe
        </label>
        <div className="relative">
          <Icon 
            icon="lucide:lock-keyhole" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            required
            className="pl-10 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon 
              icon={showConfirmPassword ? "lucide:eye-off" : "lucide:eye"} 
              className="w-5 h-5" 
            />
          </button>
        </div>
      </div>

      {/* Password Requirements */}
      <div className={`border rounded-xl p-4 transition-colors ${
        formData.password 
          ? fulfilledCount === totalRequirements 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
          : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-sm font-medium ${
            formData.password
              ? fulfilledCount === totalRequirements
                ? 'text-green-900 dark:text-green-300'
                : 'text-blue-900 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-400'
          }`}>
            Exigences du mot de passe
          </p>
          {formData.password && (
            <span className={`text-xs font-semibold ${
              fulfilledCount === totalRequirements
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {fulfilledCount}/{totalRequirements}
            </span>
          )}
        </div>
        
        <ul className="space-y-2 text-sm">
          <li className={`flex items-center gap-2 transition-colors ${
            requirements.minLength 
              ? 'text-green-700 dark:text-green-400' 
              : formData.password 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Icon 
              icon={requirements.minLength ? "lucide:check-circle-2" : "lucide:circle"} 
              className="w-4 h-4 flex-shrink-0" 
            />
            Au moins 8 caractères
          </li>
          
          <li className={`flex items-center gap-2 transition-colors ${
            requirements.hasUpperCase 
              ? 'text-green-700 dark:text-green-400' 
              : formData.password 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Icon 
              icon={requirements.hasUpperCase ? "lucide:check-circle-2" : "lucide:circle"} 
              className="w-4 h-4 flex-shrink-0" 
            />
            Une lettre majuscule (A-Z)
          </li>
        
          
          <li className={`flex items-center gap-2 transition-colors ${
            requirements.hasNumber 
              ? 'text-green-700 dark:text-green-400' 
              : formData.password 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Icon 
              icon={requirements.hasNumber ? "lucide:check-circle-2" : "lucide:circle"} 
              className="w-4 h-4 flex-shrink-0" 
            />
            Un chiffre (0-9)
          </li>
          
          <li className={`flex items-center gap-2 transition-colors ${
            requirements.hasSpecialChar 
              ? 'text-green-700 dark:text-green-400' 
              : formData.password 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Icon 
              icon={requirements.hasSpecialChar ? "lucide:check-circle-2" : "lucide:circle"} 
              className="w-4 h-4 flex-shrink-0" 
            />
            Un caractère spécial (!@#$%...)
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button 
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          <Icon icon="lucide:arrow-left" className="w-5 h-5 mr-2" />
          Retour
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
        >
          Continuer
          <Icon icon="lucide:arrow-right" className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </form>
  );
}
