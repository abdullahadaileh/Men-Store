import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import toast from 'react-hot-toast';

import ARImg from '../../images/build-with-ai/ar.svg';
import Button from './button';
import { useEffect, useState } from 'react';

export const customToastOption = {
	position: 'bottom-right',
	duration: 8e7, // 80,000,000 milisec ie. never auto-close
	style: {
		minWidth: 'fit-content',
		padding: 'unset',
		background: 'unset',
		boxShadow: 'unset',
		lineHeight: 'unset',
	},
	icon: null,
};

const PlanUpgradePromo = ( { toastId, zipPlans } ) => {
	const { active_plan, plan_data } = zipPlans;

	const [ features, setFeatures ] = useState( [] );
	const [ suggestedPlan, setSuggestedPlan ] = useState( '' );

	const handleDissmiss = async () => {
		toast.dismiss( toastId );
		await apiFetch( {
			path: 'zipwp/v1/set-plan-promo-dismiss-time',
			method: 'GET',
			headers: {
				'X-WP-Nonce': aiBuilderVars.rest_api_nonce,
				'content-type': 'application/json',
			},
		} )
			.then( console.info )
			.catch( console.error );
	};

	useEffect( () => {
		switch ( active_plan?.slug ) {
			case 'free':
				setFeatures( [
					__( '5 AI sites per day', 'ai-builder' ),
					__( '20,000 AI Credits', 'ai-builder' ),
					__( 'Premium designs', 'ai-builder' ),
					__( '5 Blueprint Sites', 'ai-builder' ),
				] );
				setSuggestedPlan( 'Pro' );
				break;
			case 'hobby':
				setFeatures( [
					__( '5 AI sites per day', 'ai-builder' ),
					__( '20,000 AI Credits', 'ai-builder' ),
					__( 'Premium designs', 'ai-builder' ),
					__( '5 Blueprint Sites', 'ai-builder' ),
				] );
				setSuggestedPlan( 'Pro' );
				break;
			case 'pro':
				setFeatures( [
					__( '10 AI sites per day', 'ai-builder' ),
					__( '100,000 AI Credits', 'ai-builder' ),
					__( 'Premium designs', 'ai-builder' ),
					__( '10 Blueprint Sites', 'ai-builder' ),
				] );
				setSuggestedPlan( 'Business' );
				break;
			default:
				break;
		}
	}, [ active_plan?.slug ] );

	return (
		<div className="text-background-primary flex flex-col-reverse md:flex-row bg-nav-active rounded-xl translate-y-1 translate-x-2">
			<div className="w-[400px] space-y-2 p-5">
				<p className="text-background-primary text-xl font-semibold">
					{ __( 'Great Start! Congratulations..', 'ai-builder' ) }
				</p>
				<p className="text-background-primary text-sm font-normal">
					{ sprintf(
						// translators: %1$s: Number of AI sites used, %2$s: Current plan name, %2$s: Suggested Plan
						__(
							"You've successfully generated %1$s AI sites with your %2$s Plan account. You can do much more with the %3$s Plan:",
							'ai-builder'
						),
						plan_data.usage.ai_sites_count,
						active_plan?.name,
						suggestedPlan
					) }
				</p>
				<div className="flex w-[360px] gap-x-5 flex-wrap">
					{ features.map( ( x, i ) => {
						return (
							<div
								className="flex w-36 gap-[6px] gap-y-1"
								key={ i }
							>
								<CheckIcon className="w-[14px]" />
								<span>{ x }</span>
							</div>
						);
					} ) }
				</div>
				<div className="flex h-10 pt-2 gap-3">
					<a
						href="https://app.zipwp.com/pricing"
						target="_blank"
						rel="noreferrer"
					>
						<Button className="text-heading-text bg-background-primary text-xs p-2 px-3">
							{ __( 'Upgrade Now', 'ai-builder' ) }
						</Button>
					</a>
					{ /* <Button className="text-xs p-2 px-3">
						{ __( 'Learn More', 'ai-builder' ) }
					</Button> */ }
				</div>
			</div>

			<div className="md:w-[200px] w-full flex items-center relative px-2">
				<XMarkIcon
					className="absolute top-4 right-4 size-4 text-st-background-secondary cursor-pointer"
					onClick={ handleDissmiss }
				/>
				<img
					src={ ARImg }
					className="w-full mt-5 md:mt-0"
					alt=""
					aria-hidden="true"
				/>
			</div>
		</div>
	);
};

export default PlanUpgradePromo;
