import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignupData } from "../page";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
const languageOptions = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ar", label: "العربية" },
];

const currencyOptions = [
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "Dollar américain ($)" },
  { value: "GBP", label: "Livre sterling (£)" },
  { value: "CHF", label: "Franc suisse (CHF)" },
  { value: "CAD", label: "Dollar canadien (CAD)" },
  { value: "MAD", label: "Dirham marocain (MAD)" },
];

interface Step3Props {
  formData: SignupData;
  updateFormData: (data: Partial<SignupData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function Step3AccountType({ formData, updateFormData, onSubmit, onBack, isLoading }: Step3Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Type de compte
        </label>
        <div className="grid grid-cols-1 gap-3">
          {/* Traveler Option */}
          <button
            type="button"
            onClick={() => updateFormData({ accountType: 'traveler' })}
            className={`relative flex items-start gap-4 p-2 rounded-xl border-2 transition-all ${
              formData.accountType === 'traveler'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              formData.accountType === 'traveler'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
            }`}>
              <Icon icon="lucide:plane" className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">Voyageur</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Réservez des hébergements et explorez le monde
              </p>
            </div>
            {formData.accountType === 'traveler' && (
              <Icon icon="lucide:check-circle-2" className="w-6 h-6 text-primary absolute top-4 right-4" />
            )}
          </button>

          {/* Host Option */}
          <button
            type="button"
            onClick={() => updateFormData({ accountType: 'host' })}
            className={`relative flex items-start gap-4 p-2 rounded-xl border-2 transition-all ${
              formData.accountType === 'host'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              formData.accountType === 'host'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
            }`}>
              <Icon icon="solar:home-smile-angle-linear" className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">Hôte</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Proposez vos logements et accueillez des voyageurs
              </p>
            </div>
            {formData.accountType === 'host' && (
              <Icon icon="lucide:check-circle-2" className="w-6 h-6 text-primary absolute top-4 right-4" />
            )}
          </button>
        </div>
      </div>

      {/* Language DropdownMenu */}
      <div className="space-y-2">
        <label htmlFor="language" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Langue préférée
        </label>
        <div className="relative">
          <Icon 
            icon="lucide:languages" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
          />
          <div className="pl-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="w-full flex justify-between items-center">
                  {formData.language
                    ? languageOptions.find(opt => opt.value === formData.language)?.label
                    : "Sélectionnez la langue"}
                  <Icon icon="lucide:chevron-down" className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full min-w-[200px]">
                {languageOptions.map(option => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => updateFormData({ language: option.value })}
                    className={formData.language === option.value ? "bg-primary/10 font-semibold" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Currency DropdownMenu */}
      <div className="space-y-2">
        <label htmlFor="currency" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Devise préférée
        </label>
        <div className="relative">
          <Icon 
            icon="lucide:coins" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
          />
          <div className="pl-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="w-full flex justify-between items-center">
                  {formData.currency
                    ? currencyOptions.find(opt => opt.value === formData.currency)?.label
                    : "Sélectionnez la devise"}
                  <Icon icon="lucide:chevron-down" className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full min-w-[200px]">
                {currencyOptions.map(option => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => updateFormData({ currency: option.value })}
                    className={formData.currency === option.value ? "bg-primary/10 font-semibold" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          En créant un compte, vous acceptez nos{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Conditions d&apos;utilisation
          </a>
          {' '}et notre{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Politique de confidentialité
          </a>
          .
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button 
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          <Icon icon="lucide:arrow-left" className="w-5 h-5 mr-2" />
          Retour
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              <span className="ml-2">Création...</span>
            </>
          ) : (
            <>
              Créer mon compte
              <Icon icon="lucide:check" className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
