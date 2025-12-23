import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupData } from "../page";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
const countryOptions = [
    // Union Européenne
    { value: "AT", label: "Autriche" },
    { value: "BE", label: "Belgique" },
    { value: "BG", label: "Bulgarie" },
    { value: "HR", label: "Croatie" },
    { value: "CY", label: "Chypre" },
    { value: "CZ", label: "République tchèque" },
    { value: "DK", label: "Danemark" },
    { value: "EE", label: "Estonie" },
    { value: "FI", label: "Finlande" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Allemagne" },
    { value: "GR", label: "Grèce" },
    { value: "HU", label: "Hongrie" },
    { value: "IE", label: "Irlande" },
    { value: "IT", label: "Italie" },
    { value: "LV", label: "Lettonie" },
    { value: "LT", label: "Lituanie" },
    { value: "LU", label: "Luxembourg" },
    { value: "MT", label: "Malte" },
    { value: "NL", label: "Pays-Bas" },
    { value: "PL", label: "Pologne" },
    { value: "PT", label: "Portugal" },
    { value: "RO", label: "Roumanie" },
    { value: "SK", label: "Slovaquie" },
    { value: "SI", label: "Slovénie" },
    { value: "ES", label: "Espagne" },
    { value: "SE", label: "Suède" },
    // États-Unis
    { value: "US", label: "États-Unis" },
    // Autres pays francophones et courants
    { value: "CH", label: "Suisse" },
    { value: "CA", label: "Canada" },
    { value: "MA", label: "Maroc" },
    { value: "TN", label: "Tunisie" },
    { value: "SN", label: "Sénégal" },
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "OTHER", label: "Autre" },
];

interface Step1Props {
    formData: SignupData;
    updateFormData: (data: Partial<SignupData>) => void;
    onNext: () => void;
}

export default function Step1BasicInfo({ formData, updateFormData, onNext }: Step1Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2">
                {/* First Name */}
                <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Prénom
                    </label>
                    <div className="relative">
                        <Icon
                            icon="lucide:user"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        />
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="Entrez votre prénom"
                            value={formData.firstName}
                            onChange={(e) => updateFormData({ firstName: e.target.value })}
                            required
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom
                    </label>
                    <div className="relative">
                        <Icon
                            icon="lucide:user"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        />
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Entrez votre nom"
                            value={formData.lastName}
                            onChange={(e) => updateFormData({ lastName: e.target.value })}
                            required
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Téléphone
                </label>
                <div className="relative">
                    <Icon
                        icon="lucide:phone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        required
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
                <label htmlFor="birthDay" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date de naissance
                </label>
                <div className="relative">
                    <Icon
                        icon="lucide:calendar"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Input
                        id="birthDay"
                        type="date"
                        value={formData.birthDay}
                        onChange={(e) => updateFormData({ birthDay: e.target.value })}
                        required
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Country DropdownMenu */}
            <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pays
                </label>
                <div className="relative">
                    <Icon
                        icon="lucide:map-pin"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    />
                    <div className="pl-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" className="w-full flex justify-between items-center">
                                    {formData.country
                                        ? countryOptions.find(opt => opt.value === formData.country)?.label
                                        : "Sélectionnez votre pays"}
                                    <Icon icon="lucide:chevron-down" className="w-4 h-4 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full min-w-[200px]">
                                {countryOptions.map(option => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onSelect={() => updateFormData({ country: option.value })}
                                        className={formData.country === option.value ? "bg-primary/10 font-semibold" : ""}
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Next Button */}
            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg transition-colors"
            >
                Continuer
                <Icon icon="lucide:arrow-right" className="w-5 h-5 ml-2" />
            </Button>
        </form>
    );
}
